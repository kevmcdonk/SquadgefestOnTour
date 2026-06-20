import { Talk, FoodOption, CraftActivity } from "@/types";

export const seedTalks: Talk[] = [
  {
    id: "talk-1",
    title: "Cats in AI",
    speaker: "Kevin McDonnell",
    description:
      "You may think that cats just sit around, acting like loaves of bread and croissants. But secretly, they are the cause of this AI revolution.",
    day: "Saturday",
    time: "11:00",
    duration: "8 mins",
    approved: true,
  },
];

export const seedFood: FoodOption[] = [
  {
    id: "food-1",
    name: "Smoked beef brisket",
    description:
      "Briskey, smoked to perfection",
    category: "meat",
    dietaryInfo: ["contains beef", "contains smoke"],
    providedBy: "The McDonnells",
    approved: true,
  },
];

export const seedCrafts: CraftActivity[] = [
  {
    id: "craft-1",
    name: "AI stickers",
    description:
      "Making stickers with AI and Cricut",
    facilitator: "Kevin",
    ageGroup: "All ages",
    materials: "Cricut",
    duration: "45 mins",
    approved: true,
  },
];
