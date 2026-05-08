"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import AlertMessage from "../components/AlertMessage";
import Loader from "../components/Loader";
import TaskCard from "../components/TaskCard";
import { deleteTaskRequest, getTasksRequest } from "../services/taskService";

function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingTaskId, setDeletingTaskId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadTasks = useCallback(async () => {
    setError("");
    try {
      const result = await getTasksRequest();
      setTasks(result.data);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to fetch tasks");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial data load for page mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadTasks();
  }, [loadTasks]);

  const handleDelete = async (taskId) => {
    setDeletingTaskId(taskId);
    setError("");
    setSuccess("");
    try {
      const result = await deleteTaskRequest(taskId);
      setTasks((previous) => previous.filter((task) => task._id !== taskId));
      setSuccess(result.message);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Failed to delete task");
    } finally {
      setDeletingTaskId("");
    }
  };

  return (
    <section>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-slate-800">Dashboard</h1>
        <Link href="/tasks/new" className="rounded bg-slate-800 px-4 py-2 text-sm text-white">
          Create Task
        </Link>
      </div>

      <AlertMessage type="error" message={error} />
      <AlertMessage type="success" message={success} />

      {isLoading ? (
        <Loader text="Loading tasks..." />
      ) : tasks.length === 0 ? (
        <div className="rounded border border-slate-200 bg-white p-4 text-sm text-slate-600">
          No tasks yet. Click "Create Task" to add one.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={handleDelete}
              deletingTaskId={deletingTaskId}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default DashboardPage;
