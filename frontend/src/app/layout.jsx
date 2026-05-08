import Navbar from "../components/Navbar";
import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Task Manager",
  description: "Simple fullstack task manager",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-100">
        <Providers>
          <Navbar />
          <main className="mx-auto max-w-4xl px-4 py-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
