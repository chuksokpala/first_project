function AlertMessage({ type = "success", message }) {
  if (!message) return null;

  const styles =
    type === "error"
      ? "bg-red-100 border-red-200 text-red-700"
      : "bg-emerald-100 border-emerald-200 text-emerald-700";

  return <div className={`mb-4 rounded border px-3 py-2 text-sm ${styles}`}>{message}</div>;
}

export default AlertMessage;
