import { Talk, FoodOption, CraftActivity } from "@/types";

export const seedTalks: Talk[] = [
  {
    id: "talk-1",
    title: "The Art of Doing Nothing: Why Rest is Radical",
    speaker: "Alex Rivers",
    description:
      "In our always-on world, choosing to rest can be a revolutionary act. Alex explores the science of rest, the history of leisure, and why doing nothing might be the most productive thing you do.",
    day: "Saturday",
    time: "11:00",
    duration: "20 mins",
    approved: true,
  },
  {
    id: "talk-2",
    title: "Fermentation Nation: How Microbes Make Magic",
    speaker: "Sam Chen",
    description:
      "From sourdough to kimchi to beer — Sam takes us on a tour of the tiny organisms that have shaped human civilisation and why fermentation is having a 21st century renaissance.",
    day: "Saturday",
    time: "14:30",
    duration: "20 mins",
    approved: true,
  },
  {
    id: "talk-3",
    title: "What Your Garden Tells You About Climate Change",
    speaker: "Priya Patel",
    description:
      "A botanist's perspective on the subtle (and not so subtle) ways our local gardens are changing. Priya shares observations from her own Suffolk garden and what we can all do.",
    day: "Sunday",
    time: "10:30",
    duration: "25 mins",
    approved: true,
  },
  {
    id: "talk-4",
    title: "The Unexpected Joy of Being Lost",
    speaker: "Tom Hadley",
    description:
      "A meditation on wandering, detours, and how getting lost — literally and metaphorically — has led to some of life's most surprising discoveries.",
    day: "Sunday",
    time: "15:00",
    duration: "20 mins",
    approved: true,
  },
];

export const seedFood: FoodOption[] = [
  {
    id: "food-1",
    name: "Suffolk Sausage Rolls",
    description:
      "Flaky pastry wrapped around locally sourced pork sausage, seasoned with sage and fennel. A festival classic with a Suffolk twist.",
    category: "snack",
    dietaryInfo: ["contains gluten", "contains pork"],
    providedBy: "The Hadley Kitchen",
    approved: true,
  },
  {
    id: "food-2",
    name: "Garden Salad Bar",
    description:
      "Fresh salads made with vegetables straight from the garden. Build your own with a range of dressings, toppings, and grains.",
    category: "main",
    dietaryInfo: ["vegan", "gluten-free available"],
    providedBy: "Patel Provisions",
    approved: true,
  },
  {
    id: "food-3",
    name: "Summer Berry Prosecco Bar",
    description:
      "Chilled prosecco with fresh strawberries, raspberries, and elderflower cordial. Also available as a non-alcoholic sparkler.",
    category: "drink",
    dietaryInfo: ["vegan", "alcohol available", "alcohol-free option"],
    providedBy: "Rivers Refreshments",
    approved: true,
  },
  {
    id: "food-4",
    name: "Sticky Toffee Pudding",
    description:
      "A classic Suffolk sticky toffee pudding, served warm with lashings of toffee sauce and clotted cream.",
    category: "dessert",
    dietaryInfo: ["vegetarian", "contains dairy", "contains gluten"],
    providedBy: "Chen's Sweet Corner",
    approved: true,
  },
  {
    id: "food-5",
    name: "BBQ Veggie Skewers",
    description:
      "Colourful skewers of marinated halloumi, peppers, courgette, red onion, and cherry tomatoes, grilled on the BBQ.",
    category: "main",
    dietaryInfo: ["vegetarian", "gluten-free"],
    providedBy: "Patel Provisions",
    approved: true,
  },
  {
    id: "food-6",
    name: "Suffolk Punch Lemonade",
    description:
      "Homemade lemonade with fresh mint and cucumber. Named after the beloved Suffolk draught horse. Refreshing and very Instagram-able.",
    category: "drink",
    dietaryInfo: ["vegan", "gluten-free", "alcohol-free"],
    providedBy: "Rivers Refreshments",
    approved: true,
  },
];

export const seedCrafts: CraftActivity[] = [
  {
    id: "craft-1",
    name: "Festival Crown Making",
    description:
      "Create your own floral festival crown using fresh flowers and foliage from the garden. All skill levels welcome — no experience needed!",
    facilitator: "Lily Thompson",
    ageGroup: "All ages",
    materials: "Fresh flowers, foliage, wire, tape (provided)",
    duration: "45 mins",
    approved: true,
  },
  {
    id: "craft-2",
    name: "Natural Tie-Dye",
    description:
      "Use natural plant dyes (onion skins, beetroot, turmeric) to create stunning patterns on cotton tote bags or t-shirts. Take a truly unique souvenir home.",
    facilitator: "Marcus Green",
    ageGroup: "Ages 8+",
    materials: "Plant dyes, cotton items, rubber bands (provided). Bring an old t-shirt if you have one!",
    duration: "1 hour",
    approved: true,
  },
  {
    id: "craft-3",
    name: "Watercolour Painting",
    description:
      "Paint the Suffolk countryside around you with watercolours. A relaxed, mindful activity perfect for all ages. Guided by a local artist.",
    facilitator: "Sophie Clarke",
    ageGroup: "All ages",
    materials: "Watercolour paints, brushes, paper (provided)",
    duration: "Open session",
    approved: true,
  },
  {
    id: "craft-4",
    name: "Friendship Bracelet Workshop",
    description:
      "Learn the traditional art of macramé friendship bracelets. Take one home and leave one on the festival tree!",
    facilitator: "Zara Ahmed",
    ageGroup: "Ages 6+",
    materials: "Coloured thread, clips (provided)",
    duration: "30 mins",
    approved: true,
  },
];
