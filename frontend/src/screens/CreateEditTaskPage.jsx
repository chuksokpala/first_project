"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import AlertMessage from "../components/AlertMessage";
import Loader from "../components/Loader";
import {
  createTaskRequest,
  getTaskByIdRequest,
  updateTaskRequest,
} from "../services/taskService";

const initialForm = {
  title: "",
  description: "",
  status: "todo",
};

function CreateEditTaskPage() {
  const { id } = useParams();
  const isEditMode = useMemo(() => Boolean(id), [id]);
  const router = useRouter();
  const [formData, setFormData] = useState(initialForm);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(isEditMode);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      if (!isEditMode) return;

      try {
        const result = await getTaskByIdRequest(id);
        const task = result.data;
        setFormData({
          title: task.title || "",
          description: task.description || "",
          status: task.status || "todo",
        });
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Unable to load task");
      } finally {
        setIsFetching(false);
      }
    };

    fetchTask();
  }, [id, isEditMode]);

  const handleChange = (event) => {
    setFormData((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const result = isEditMode
        ? await updateTaskRequest(id, formData)
        : await createTaskRequest(formData);
      setSuccess(result.message);
      router.replace("/dashboard");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Task save failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) return <Loader text="Loading task details..." />;

  return (
    <section className="mx-auto max-w-xl rounded border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-slate-800">
          {isEditMode ? "Edit Task" : "Create Task"}
        </h1>
        <Link href="/dashboard" className="text-sm text-slate-700 underline">
          Back
        </Link>
      </div>

      <AlertMessage type="error" message={error} />
      <AlertMessage type="success" message={success} />

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Task title"
          value={formData.title}
          onChange={handleChange}
          className="w-full rounded border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          required
        />
        <textarea
          name="description"
          placeholder="Task description"
          value={formData.description}
          onChange={handleChange}
          className="w-full rounded border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          rows={4}
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full rounded border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <button
          type="submit"
          disabled={isLoading}
          className="rounded bg-slate-800 px-4 py-2 text-sm text-white hover:bg-slate-700 disabled:opacity-60"
        >
          {isLoading ? "Saving..." : isEditMode ? "Update Task" : "Create Task"}
        </button>
      </form>
    </section>
  );
}

export default CreateEditTaskPage;
