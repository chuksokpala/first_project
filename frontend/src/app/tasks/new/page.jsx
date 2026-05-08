import AuthGuard from "../../../components/AuthGuard";
import CreateEditTaskPage from "../../../screens/CreateEditTaskPage";

export default function NewTaskRoutePage() {
  return (
    <AuthGuard>
      <CreateEditTaskPage />
    </AuthGuard>
  );
}
