"use client";

import { useState } from "react";
import { FoodOption } from "@/types";
import { getFood, saveFood } from "@/lib/storage";
import { seedFood } from "@/data/seedData";

function loadFood(): FoodOption[] {
  if (typeof window === "undefined") return [];
  const stored = getFood();
  if (stored.length === 0) {
    saveFood(seedFood);
    return seedFood;
  }
  return stored;
}

const categoryConfig = {
  main: { label: "Main", emoji: "🍽️", color: "bg-festival-orange text-white" },
  snack: { label: "Snack", emoji: "🥨", color: "bg-festival-yellow text-festival-dark" },
  drink: { label: "Drink", emoji: "🥤", color: "bg-festival-purple text-white" },
  dessert: { label: "Dessert", emoji: "🍰", color: "bg-festival-pink text-white" },
};

const dietaryColors: Record<string, string> = {
  vegan: "bg-green-100 text-green-800",
  vegetarian: "bg-lime-100 text-lime-800",
  "gluten-free": "bg-yellow-100 text-yellow-800",
  "gluten-free available": "bg-yellow-100 text-yellow-800",
  "alcohol-free option": "bg-blue-100 text-blue-800",
  "alcohol available": "bg-purple-100 text-purple-800",
  "contains dairy": "bg-orange-100 text-orange-800",
  "contains gluten": "bg-red-100 text-red-800",
  "contains pork": "bg-red-100 text-red-800",
  "alcohol-free": "bg-blue-100 text-blue-800",
};

export default function FoodPage() {
  const [food] = useState<FoodOption[]>(() => loadFood());
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const approvedFood = food.filter((f) => f.approved);
  const categories = ["All", ...Object.keys(categoryConfig)];
  const filtered =
    selectedCategory === "All"
      ? approvedFood
      : approvedFood.filter((f) => f.category === selectedCategory);

  return (
    <div>
      {/* Header */}
      <section className="festival-gradient text-white py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-5xl mb-3">🍔</div>
          <h1 className="text-4xl md:text-5xl font-black mb-3">Food &amp; Drink</h1>
          <p className="text-lg opacity-80">
            Locally sourced, lovingly prepared. Suffolk has never tasted this good.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <div className="max-w-5xl mx-auto px-4 pt-8">
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => {
            const config = categoryConfig[cat as keyof typeof categoryConfig];
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                  selectedCategory === cat
                    ? "bg-festival-dark text-white"
                    : "bg-white text-festival-dark border border-festival-dark/20 hover:border-festival-dark"
                }`}
              >
                {config ? `${config.emoji} ${config.label}` : "🍽️ All"}
              </button>
            );
          })}
        </div>
      </div>

      {/* Food Grid */}
      <section className="max-w-5xl mx-auto px-4 py-8 pb-16">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-festival-dark/40">
            <div className="text-5xl mb-4">🍽️</div>
            <p className="text-lg">No food options yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => {
              const cat = categoryConfig[item.category];
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-festival-dark/5 festival-card flex flex-col"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${cat?.color ?? "bg-gray-100 text-gray-700"}`}
                    >
                      {cat?.emoji} {cat?.label}
                    </span>
                    <span className="text-xs text-festival-dark/40 font-medium">
                      by {item.providedBy}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-festival-dark mb-2">{item.name}</h3>
                  <p className="text-festival-dark/60 text-sm leading-relaxed flex-1">
                    {item.description}
                  </p>
                  {item.dietaryInfo.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {item.dietaryInfo.map((info) => (
                        <span
                          key={info}
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            dietaryColors[info] ?? "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {info}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Submit CTA */}
        <div className="mt-12 bg-festival-orange rounded-2xl p-8 text-center text-white">
          <div className="text-4xl mb-3">🍽️</div>
          <h3 className="text-2xl font-black mb-2">Want to provide food?</h3>
          <p className="text-white/80 mb-6">
            Got a recipe or food idea you&apos;d like to bring? Submit it and we&apos;ll add it to the menu.
          </p>
          <a
            href="/submit"
            className="inline-block bg-white text-festival-dark font-black px-8 py-3 rounded-full hover:bg-festival-yellow transition-colors"
          >
            Submit Food Idea ✨
          </a>
        </div>
      </section>
    </div>
  );
}
