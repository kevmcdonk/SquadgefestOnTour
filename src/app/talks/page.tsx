"use client";

import { useEffect, useState } from "react";
import { Talk } from "@/types";
import { getTalks, refreshTalksFromRemote, saveTalks } from "@/lib/storage";
import { seedTalks } from "@/data/seedData";

function loadTalks(): Talk[] {
  if (typeof window === "undefined") return [];
  const stored = getTalks();
  if (stored.length === 0) {
    saveTalks(seedTalks);
    return seedTalks;
  }
  return stored;
}

const dayColors: Record<string, string> = {
  Saturday: "bg-festival-yellow text-festival-dark",
  Sunday: "bg-festival-orange text-white",
};

export default function TalksPage() {
  const [talks, setTalks] = useState<Talk[]>(() => loadTalks());
  const [selectedDay, setSelectedDay] = useState<string>("All");

  useEffect(() => {
    let cancelled = false;

    void refreshTalksFromRemote().then((remoteTalks) => {
      if (cancelled) return;

      if (remoteTalks.length === 0) {
        saveTalks(seedTalks);
        setTalks(seedTalks);
        return;
      }

      setTalks(remoteTalks);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const approvedTalks = talks.filter((t) => t.approved);
  const days = ["All", ...Array.from(new Set(approvedTalks.map((t) => t.day).filter((d): d is string => Boolean(d))))];
  const filteredTalks =
    selectedDay === "All"
      ? approvedTalks
      : approvedTalks.filter((t) => t.day === selectedDay);

  return (
    <div>
      {/* Header */}
      <section className="festival-gradient text-white py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-5xl mb-3">🎤</div>
          <h1 className="text-4xl md:text-5xl font-black mb-3">Ted-Style Talks</h1>
          <p className="text-lg opacity-80">
            Short, punchy, inspiring talks from brilliant minds. Expect the unexpected.
          </p>
        </div>
      </section>

      {/* Day Filter */}
      {days.length > 1 && (
        <div className="max-w-5xl mx-auto px-4 pt-8">
          <div className="flex gap-2 flex-wrap">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                  selectedDay === day
                    ? "bg-festival-dark text-white"
                    : "bg-white text-festival-dark border border-festival-dark/20 hover:border-festival-dark"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Talks Grid */}
      <section className="max-w-5xl mx-auto px-4 py-8 pb-16">
        {filteredTalks.length === 0 ? (
          <div className="text-center py-20 text-festival-dark/40">
            <div className="text-5xl mb-4">🎤</div>
            <p className="text-lg">No talks yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTalks.map((talk) => (
              <div
                key={talk.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-festival-dark/5 festival-card"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex flex-wrap gap-2">
                    {talk.day && (
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${
                          dayColors[talk.day] ?? "bg-festival-purple text-white"
                        }`}
                      >
                        {talk.day}
                      </span>
                    )}
                    {talk.time && (
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-festival-dark/60">
                        🕐 {talk.time}
                      </span>
                    )}
                    {talk.duration && (
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-festival-dark/60">
                        ⏱️ {talk.duration}
                      </span>
                    )}
                  </div>
                </div>
                <h3 className="text-xl font-black text-festival-dark mb-1">{talk.title}</h3>
                <p className="text-festival-purple font-semibold text-sm mb-3">
                  👤 {talk.speaker}
                </p>
                <p className="text-festival-dark/60 text-sm leading-relaxed">{talk.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Submit CTA */}
        <div className="mt-12 bg-festival-dark rounded-2xl p-8 text-center text-white">
          <div className="text-4xl mb-3">🎤</div>
          <h3 className="text-2xl font-black mb-2">Want to give a talk?</h3>
          <p className="text-white/60 mb-6">
            Got an idea worth sharing? We want to hear it. Talks are 15–25 minutes.
          </p>
          <a
            href="/submit"
            className="inline-block bg-festival-yellow text-festival-dark font-black px-8 py-3 rounded-full hover:bg-festival-orange hover:text-white transition-colors"
          >
            Submit a Talk ✨
          </a>
        </div>
      </section>
    </div>
  );
}
