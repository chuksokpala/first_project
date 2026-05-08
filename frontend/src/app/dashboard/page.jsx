import AuthGuard from "../../components/AuthGuard";
import DashboardPage from "../../screens/DashboardPage";

export default function DashboardRoutePage() {
  return (
    <AuthGuard>
      <DashboardPage />
    </AuthGuard>
  );
}
