"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AlertMessage from "../components/AlertMessage";
import Loader from "../components/Loader";
import { useAuth } from "../context/useAuth";

function RegisterPage() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { register, isLoading } = useAuth();
  const router = useRouter();

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

    try {
      const response = await register(formData);
      setSuccess(response.message);
      router.replace("/dashboard");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Registration failed");
    }
  };

  return (
    <section className="mx-auto max-w-md rounded border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="mb-1 text-xl font-semibold text-slate-800">Register</h1>
      <p className="mb-4 text-sm text-slate-600">Create your account</p>

      <AlertMessage type="error" message={error} />
      <AlertMessage type="success" message={success} />

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password (min 6 chars)"
          value={formData.password}
          onChange={handleChange}
          className="w-full rounded border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          required
          minLength={6}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded bg-slate-800 px-4 py-2 text-sm text-white hover:bg-slate-700 disabled:opacity-60"
        >
          {isLoading ? "Creating account..." : "Register"}
        </button>
      </form>

      {isLoading && <Loader text="Please wait..." />}

      <p className="mt-4 text-sm text-slate-600">
        Already registered?{" "}
        <Link href="/login" className="text-slate-800 underline">
          Login
        </Link>
      </p>
    </section>
  );
}

export default RegisterPage;
