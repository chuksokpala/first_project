"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/useAuth";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
        <Link href="/dashboard" className="text-lg font-semibold text-slate-800">
          Task Manager
        </Link>

        <div className="flex items-center gap-3 text-sm">
          {isAuthenticated ? (
            <>
              <span className="text-slate-600">{user?.name}</span>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded bg-slate-800 px-3 py-2 text-white hover:bg-slate-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-slate-700 hover:text-slate-900">
                Login
              </Link>
              <Link href="/register" className="text-slate-700 hover:text-slate-900">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
