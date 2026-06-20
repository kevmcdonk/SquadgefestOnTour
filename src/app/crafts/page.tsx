"use client";

import { useState } from "react";
import { CraftActivity } from "@/types";
import { getCrafts, saveCrafts } from "@/lib/storage";
import { seedCrafts } from "@/data/seedData";

function loadCrafts(): CraftActivity[] {
  if (typeof window === "undefined") return [];
  const stored = getCrafts();
  if (stored.length === 0) {
    saveCrafts(seedCrafts);
    return seedCrafts;
  }
  return stored;
}

export default function CraftsPage() {
  const [crafts] = useState<CraftActivity[]>(() => loadCrafts());

  const approvedCrafts = crafts.filter((c) => c.approved);

  const cardColors = [
    "bg-festival-yellow",
    "bg-festival-orange text-white",
    "bg-festival-pink text-white",
    "bg-festival-purple text-white",
    "bg-festival-green text-white",
  ];

  return (
    <div>
      {/* Header */}
      <section className="festival-gradient text-white py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-5xl mb-3">🎨</div>
          <h1 className="text-4xl md:text-5xl font-black mb-3">Craft Activities</h1>
          <p className="text-lg opacity-80">
            Get creative! From flower crowns to tie-dye, there&apos;s something for everyone.
          </p>
        </div>
      </section>

      {/* Crafts Grid */}
      <section className="max-w-5xl mx-auto px-4 py-12 pb-16">
        {approvedCrafts.length === 0 ? (
          <div className="text-center py-20 text-festival-dark/40">
            <div className="text-5xl mb-4">🎨</div>
            <p className="text-lg">No craft activities yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {approvedCrafts.map((craft, index) => {
              const colorClass = cardColors[index % cardColors.length];
              const isLight = colorClass.includes("festival-yellow");
              const textColor = isLight ? "text-festival-dark" : "text-white";
              const mutedColor = isLight ? "text-festival-dark/60" : "text-white/70";
              const tagColor = isLight
                ? "bg-festival-dark/10 text-festival-dark"
                : "bg-white/20 text-white";

              return (
                <div
                  key={craft.id}
                  className={`${colorClass} rounded-2xl p-6 festival-card`}
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <h3 className={`text-xl font-black ${textColor}`}>{craft.name}</h3>
                    {craft.ageGroup && (
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap ${tagColor}`}
                      >
                        {craft.ageGroup}
                      </span>
                    )}
                  </div>

                  <p className={`${mutedColor} text-sm leading-relaxed mb-4`}>
                    {craft.description}
                  </p>

                  <div className={`text-sm space-y-1 ${mutedColor}`}>
                    <p>
                      <span className="font-semibold">Facilitator:</span> {craft.facilitator}
                    </p>
                    {craft.duration && (
                      <p>
                        <span className="font-semibold">Duration:</span> {craft.duration}
                      </p>
                    )}
                    {craft.materials && (
                      <p>
                        <span className="font-semibold">Materials:</span> {craft.materials}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Submit CTA */}
        <div className="mt-12 bg-festival-dark rounded-2xl p-8 text-center text-white">
          <div className="text-4xl mb-3">🎨</div>
          <h3 className="text-2xl font-black mb-2">Want to run a craft session?</h3>
          <p className="text-white/60 mb-6">
            Got a creative skill to share? Propose your craft activity and let&apos;s make something together.
          </p>
          <a
            href="/submit"
            className="inline-block bg-festival-yellow text-festival-dark font-black px-8 py-3 rounded-full hover:bg-festival-orange hover:text-white transition-colors"
          >
            Submit a Craft ✨
          </a>
        </div>
      </section>
    </div>
  );
}
