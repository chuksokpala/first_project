const dns = require("dns");
const mongoose = require("mongoose");

/**
 * Atlas `mongodb+srv://` URIs require DNS SRV lookups. Some networks/resolvers
 * return EREFUSED for SRV queries. Using public DNS servers for the Node
 * process fixes that without changing the user's system settings.
 *
 * Override with MONGO_DNS_SERVERS=comma,separated,ips or set MONGO_SKIP_DNS_FIX=1
 * to disable (e.g. if you use a corporate DNS that must stay in effect).
 */
const applyDnsWorkaroundForSrv = () => {
  const uri = process.env.MONGO_URI || "";
  if (!uri.startsWith("mongodb+srv://")) {
    return;
  }
  if (process.env.MONGO_SKIP_DNS_FIX === "1") {
    return;
  }

  const custom = process.env.MONGO_DNS_SERVERS;
  const servers = custom
    ? custom.split(",").map((s) => s.trim()).filter(Boolean)
    : ["8.8.8.8", "1.1.1.1"];

  try {
    dns.setServers(servers);
    console.log(`MongoDB SRV: using DNS servers: ${servers.join(", ")}`);
  } catch (error) {
    console.warn("MongoDB SRV: could not set DNS servers:", error.message);
  }
};

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error("MongoDB connection failed: MONGO_URI is not set in environment.");
    process.exit(1);
  }

  applyDnsWorkaroundForSrv();

  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 15_000,
    });
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    if (error.message.includes("querySrv")) {
      console.error(
        "Hint: SRV DNS lookup failed. Options: fix system DNS, set MONGO_DNS_SERVERS=8.8.8.8,1.1.1.1, " +
          "or use Atlas 'Standard connection string' (mongodb://...) instead of mongodb+srv://."
      );
    }
    process.exit(1);
  }
};

module.exports = connectDB;
