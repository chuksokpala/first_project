"use client";

import Link from "next/link";

function TaskCard({ task, onDelete, deletingTaskId }) {
  return (
    <article className="rounded border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-slate-800">{task.title}</h3>
        <span className="rounded bg-slate-100 px-2 py-1 text-xs capitalize text-slate-700">
          {task.status}
        </span>
      </div>
      <p className="mb-4 text-sm text-slate-600">{task.description || "No description"}</p>
      <div className="flex gap-2">
        <Link
          href={`/tasks/${task._id}/edit`}
          className="rounded bg-slate-800 px-3 py-2 text-xs text-white hover:bg-slate-700"
        >
          Edit
        </Link>
        <button
          type="button"
          onClick={() => onDelete(task._id)}
          disabled={deletingTaskId === task._id}
          className="rounded bg-red-600 px-3 py-2 text-xs text-white hover:bg-red-500 disabled:opacity-60"
        >
          {deletingTaskId === task._id ? "Deleting..." : "Delete"}
        </button>
      </div>
    </article>
  );
}

export default TaskCard;
