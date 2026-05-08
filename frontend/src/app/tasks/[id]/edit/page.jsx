import AuthGuard from "../../../../components/AuthGuard";
import CreateEditTaskPage from "../../../../screens/CreateEditTaskPage";

export default function EditTaskRoutePage() {
  return (
    <AuthGuard>
      <CreateEditTaskPage />
    </AuthGuard>
  );
}
