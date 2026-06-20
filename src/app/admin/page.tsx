"use client";

import { useState } from "react";
import {
  isAdminAuthenticated,
  adminLogin,
  adminLogout,
  getSubmissions,
  approveSubmission,
  rejectSubmission,
} from "@/lib/storage";
import { Submission } from "@/types";

const typeColors: Record<string, string> = {
  talk: "bg-festival-purple text-white",
  food: "bg-festival-orange text-white",
  craft: "bg-festival-pink text-white",
  other: "bg-gray-400 text-white",
};

const typeEmoji: Record<string, string> = {
  talk: "🎤",
  food: "🍔",
  craft: "🎨",
  other: "✨",
};

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean>(() => isAdminAuthenticated());
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [submissions, setSubmissions] = useState<Submission[]>(() =>
    isAdminAuthenticated() ? getSubmissions() : []
  );
  const [filter, setFilter] = useState<"pending" | "approved">("pending");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (adminLogin(password)) {
      setAuthenticated(true);
      setSubmissions(getSubmissions());
      setLoginError("");
    } else {
      setLoginError("Incorrect password. Try again.");
    }
  }

  function handleLogout() {
    adminLogout();
    setAuthenticated(false);
    setSubmissions([]);
    setPassword("");
  }

  function handleApprove(id: string) {
    approveSubmission(id);
    setSubmissions(getSubmissions());
  }

  function handleReject(id: string) {
    rejectSubmission(id);
    setSubmissions(getSubmissions());
  }

  const filtered = submissions.filter((s) =>
    filter === "pending" ? !s.approved : s.approved
  );

  if (!authenticated) {
    return (
      <div>
        <section className="bg-festival-dark text-white py-16 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="text-5xl mb-3">🔐</div>
            <h1 className="text-4xl md:text-5xl font-black mb-3">Admin</h1>
            <p className="text-lg opacity-80">Festival admin area. Authorised personnel only.</p>
          </div>
        </section>

        <div className="max-w-md mx-auto px-4 py-16">
          <form onSubmit={handleLogin} className="bg-white rounded-3xl p-8 shadow-lg">
            <h2 className="text-2xl font-black text-festival-dark mb-1">Sign In</h2>
            <p className="text-festival-dark/50 text-sm mb-6">
              Enter the admin password to access the dashboard.
            </p>

            <div className="mb-4">
              <label className="block text-sm font-bold text-festival-dark mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className={`w-full border-2 rounded-xl px-4 py-3 text-festival-dark focus:outline-none focus:border-festival-purple transition-colors ${
                  loginError ? "border-festival-pink" : "border-festival-dark/20"
                }`}
                autoFocus
              />
              {loginError && (
                <p className="text-festival-pink text-xs mt-1">{loginError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-festival-dark text-white font-black py-3 rounded-xl hover:bg-festival-purple transition-colors"
            >
              Sign In →
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <section className="bg-festival-dark text-white py-16 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-3xl mb-2">🎪</div>
            <h1 className="text-3xl md:text-4xl font-black">Admin Dashboard</h1>
            <p className="text-white/60 mt-1">Manage submissions for Squadgefest 2026</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-white/10 hover:bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
          >
            Sign Out
          </button>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-8 pb-16">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {(["talk", "food", "craft", "other"] as const).map((type) => {
            const count = submissions.filter((s) => s.type === type && !s.approved).length;
            return (
              <div key={type} className="bg-white rounded-2xl p-4 shadow-sm text-center">
                <div className="text-2xl mb-1">{typeEmoji[type]}</div>
                <div className="text-2xl font-black text-festival-dark">{count}</div>
                <div className="text-xs text-festival-dark/50 capitalize font-semibold">
                  pending {type}s
                </div>
              </div>
            );
          })}
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setFilter("pending")}
            className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
              filter === "pending"
                ? "bg-festival-dark text-white"
                : "bg-white text-festival-dark border border-festival-dark/20"
            }`}
          >
            Pending ({submissions.filter((s) => !s.approved).length})
          </button>
          <button
            onClick={() => setFilter("approved")}
            className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
              filter === "approved"
                ? "bg-festival-dark text-white"
                : "bg-white text-festival-dark border border-festival-dark/20"
            }`}
          >
            Approved ({submissions.filter((s) => s.approved).length})
          </button>
        </div>

        {/* Submissions list */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-festival-dark/40">
            <div className="text-5xl mb-4">
              {filter === "pending" ? "🎉" : "📋"}
            </div>
            <p className="text-lg">
              {filter === "pending"
                ? "No pending submissions — all caught up!"
                : "No approved submissions yet."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((submission) => (
              <div
                key={submission.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-festival-dark/5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${typeColors[submission.type]}`}
                      >
                        {typeEmoji[submission.type]} {submission.type}
                      </span>
                      <span className="text-xs text-festival-dark/40 font-medium">
                        {new Date(submission.submittedAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-festival-dark mb-1">
                      {submission.title}
                    </h3>
                    <p className="text-sm text-festival-dark/60 mb-2 leading-relaxed">
                      {submission.description}
                    </p>
                    {submission.extraInfo && (
                      <p className="text-sm text-festival-dark/40 italic mb-2">
                        {submission.extraInfo}
                      </p>
                    )}
                    <p className="text-xs text-festival-dark/50 font-semibold">
                      Submitted by:{" "}
                      <span className="text-festival-purple">
                        {submission.submittedBy}
                      </span>{" "}
                      {"<"}{submission.submittedByEmail}{">"}
                    </p>
                  </div>

                  {!submission.approved && (
                    <div className="flex flex-col gap-2 shrink-0">
                      <button
                        onClick={() => handleApprove(submission.id)}
                        className="bg-festival-green text-white text-sm font-bold px-4 py-2 rounded-xl hover:opacity-80 transition-opacity"
                      >
                        ✓ Approve
                      </button>
                      <button
                        onClick={() => handleReject(submission.id)}
                        className="bg-festival-pink text-white text-sm font-bold px-4 py-2 rounded-xl hover:opacity-80 transition-opacity"
                      >
                        ✗ Reject
                      </button>
                    </div>
                  )}

                  {submission.approved && (
                    <span className="bg-festival-green/10 text-festival-green text-xs font-bold px-3 py-1 rounded-full shrink-0">
                      ✓ Approved
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
