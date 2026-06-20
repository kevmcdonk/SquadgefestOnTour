"use client";

import { useState } from "react";
import Link from "next/link";
import { SubmissionType } from "@/types";
import { addSubmission } from "@/lib/storage";

const submissionTypes = [
  { value: "talk", label: "🎤 Talk", description: "A 15–25 minute talk on any topic" },
  { value: "food", label: "🍔 Food / Drink", description: "A dish or drink to contribute" },
  { value: "craft", label: "🎨 Craft Activity", description: "A creative session to run" },
  { value: "other", label: "✨ Other", description: "Something else entirely" },
];

export default function SubmitPage() {
  const [step, setStep] = useState<"identify" | "form" | "success">("identify");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState<SubmissionType>("talk");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validateIdentity() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Please enter your name";
    if (!email.trim()) e.email = "Please enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Please enter a valid email";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateForm() {
    const e: Record<string, string> = {};
    if (!title.trim()) e.title = "Please enter a title";
    if (!description.trim()) e.description = "Please enter a description";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleIdentitySubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validateIdentity()) setStep("form");
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateForm()) return;
    addSubmission({
      type,
      title: title.trim(),
      description: description.trim(),
      submittedBy: name.trim(),
      submittedByEmail: email.trim(),
      extraInfo: extraInfo.trim() || undefined,
    });
    setStep("success");
  }

  if (step === "success") {
    return (
      <div>
        <section className="festival-gradient text-white py-16 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="text-5xl mb-3">✨</div>
            <h1 className="text-4xl md:text-5xl font-black mb-3">Submission Received!</h1>
            <p className="text-lg opacity-80">Thanks for contributing to Squadgefest 2026.</p>
          </div>
        </section>
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="bg-white rounded-3xl p-10 shadow-lg">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-black text-festival-dark mb-3">You&apos;re amazing!</h2>
            <p className="text-festival-dark/60 mb-2">
              Your submission has been received and will be reviewed by our team.
            </p>
            <p className="text-festival-dark/60 mb-8">
              We&apos;ll be in touch at <strong>{email}</strong> once it&apos;s been approved.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/"
                className="bg-festival-dark text-white font-bold px-6 py-3 rounded-full hover:bg-festival-purple transition-colors"
              >
                Back to Home
              </Link>
              <button
                onClick={() => {
                  setStep("identify");
                  setTitle("");
                  setDescription("");
                  setExtraInfo("");
                }}
                className="bg-festival-yellow text-festival-dark font-bold px-6 py-3 rounded-full hover:bg-festival-orange transition-colors"
              >
                Submit Another
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <section className="festival-gradient text-white py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-5xl mb-3">✨</div>
          <h1 className="text-4xl md:text-5xl font-black mb-3">Submit Something</h1>
          <p className="text-lg opacity-80">
            Want to talk, cook, or run a craft session? Tell us about it!
          </p>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-4 py-12 pb-16">
        {/* Step indicator */}
        <div className="flex items-center gap-3 mb-8">
          <div
            className={`flex items-center gap-2 font-semibold text-sm ${step === "identify" ? "text-festival-dark" : "text-festival-dark/40"}`}
          >
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${
                step === "identify" ? "bg-festival-yellow text-festival-dark" : "bg-festival-green text-white"
              }`}
            >
              {step === "form" ? "✓" : "1"}
            </span>
            Who are you?
          </div>
          <div className="flex-1 h-px bg-festival-dark/10" />
          <div
            className={`flex items-center gap-2 font-semibold text-sm ${step === "form" ? "text-festival-dark" : "text-festival-dark/40"}`}
          >
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${
                step === "form" ? "bg-festival-yellow text-festival-dark" : "bg-festival-dark/10 text-festival-dark/40"
              }`}
            >
              2
            </span>
            Your Idea
          </div>
        </div>

        {step === "identify" && (
          <form onSubmit={handleIdentitySubmit} className="bg-white rounded-3xl p-8 shadow-lg">
            <h2 className="text-2xl font-black text-festival-dark mb-1">Who are you?</h2>
            <p className="text-festival-dark/50 text-sm mb-6">
              We just need your name and email so we can get back to you.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-festival-dark mb-1">
                  Your Name <span className="text-festival-pink">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Smith"
                  className={`w-full border-2 rounded-xl px-4 py-3 text-festival-dark focus:outline-none focus:border-festival-purple transition-colors ${
                    errors.name ? "border-festival-pink" : "border-festival-dark/20"
                  }`}
                />
                {errors.name && (
                  <p className="text-festival-pink text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-festival-dark mb-1">
                  Email Address <span className="text-festival-pink">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. alex@example.com"
                  className={`w-full border-2 rounded-xl px-4 py-3 text-festival-dark focus:outline-none focus:border-festival-purple transition-colors ${
                    errors.email ? "border-festival-pink" : "border-festival-dark/20"
                  }`}
                />
                {errors.email && (
                  <p className="text-festival-pink text-xs mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 w-full bg-festival-dark text-white font-black py-3 rounded-xl hover:bg-festival-purple transition-colors"
            >
              Continue →
            </button>
          </form>
        )}

        {step === "form" && (
          <form onSubmit={handleFormSubmit} className="bg-white rounded-3xl p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-festival-yellow text-festival-dark text-sm font-bold px-3 py-1 rounded-full">
                {name}
              </div>
              <button
                type="button"
                onClick={() => setStep("identify")}
                className="text-festival-dark/40 text-xs hover:text-festival-dark"
              >
                (not you?)
              </button>
            </div>

            <h2 className="text-2xl font-black text-festival-dark mb-1">Your Idea</h2>
            <p className="text-festival-dark/50 text-sm mb-6">Tell us what you&apos;d like to contribute.</p>

            <div className="space-y-5">
              {/* Type selector */}
              <div>
                <label className="block text-sm font-bold text-festival-dark mb-2">
                  What type of submission is this? <span className="text-festival-pink">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {submissionTypes.map((t) => (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => setType(t.value as SubmissionType)}
                      className={`text-left p-3 rounded-xl border-2 transition-all ${
                        type === t.value
                          ? "border-festival-purple bg-festival-purple/5"
                          : "border-festival-dark/10 hover:border-festival-dark/30"
                      }`}
                    >
                      <div className="font-bold text-sm text-festival-dark">{t.label}</div>
                      <div className="text-xs text-festival-dark/50 mt-0.5">{t.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-bold text-festival-dark mb-1">
                  Title <span className="text-festival-pink">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={
                    type === "talk"
                      ? "e.g. The Joy of Sourdough"
                      : type === "food"
                      ? "e.g. Homemade Kimchi"
                      : type === "craft"
                      ? "e.g. Pressed Flower Cards"
                      : "Give it a title"
                  }
                  className={`w-full border-2 rounded-xl px-4 py-3 text-festival-dark focus:outline-none focus:border-festival-purple transition-colors ${
                    errors.title ? "border-festival-pink" : "border-festival-dark/20"
                  }`}
                />
                {errors.title && (
                  <p className="text-festival-pink text-xs mt-1">{errors.title}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-bold text-festival-dark mb-1">
                  Description <span className="text-festival-pink">*</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell us a bit more about it…"
                  rows={4}
                  className={`w-full border-2 rounded-xl px-4 py-3 text-festival-dark focus:outline-none focus:border-festival-purple transition-colors resize-none ${
                    errors.description ? "border-festival-pink" : "border-festival-dark/20"
                  }`}
                />
                {errors.description && (
                  <p className="text-festival-pink text-xs mt-1">{errors.description}</p>
                )}
              </div>

              {/* Extra info */}
              <div>
                <label className="block text-sm font-bold text-festival-dark mb-1">
                  Anything else? (optional)
                </label>
                <textarea
                  value={extraInfo}
                  onChange={(e) => setExtraInfo(e.target.value)}
                  placeholder={
                    type === "talk"
                      ? "Any special requirements, preferred time slot, etc."
                      : type === "food"
                      ? "Dietary info, equipment needed, servings, etc."
                      : type === "craft"
                      ? "Age group, materials needed, space requirements, etc."
                      : "Any additional details"
                  }
                  rows={3}
                  className="w-full border-2 border-festival-dark/20 rounded-xl px-4 py-3 text-festival-dark focus:outline-none focus:border-festival-purple transition-colors resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => setStep("identify")}
                className="px-6 py-3 rounded-xl border-2 border-festival-dark/20 font-bold text-festival-dark hover:border-festival-dark/50 transition-colors"
              >
                ← Back
              </button>
              <button
                type="submit"
                className="flex-1 bg-festival-purple text-white font-black py-3 rounded-xl hover:bg-festival-pink transition-colors"
              >
                Submit Idea ✨
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
