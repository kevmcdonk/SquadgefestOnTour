import { Talk, FoodOption, CraftActivity, Submission } from "@/types";

const STORAGE_KEYS = {
  TALKS: "squadgefest_talks",
  FOOD: "squadgefest_food",
  CRAFTS: "squadgefest_crafts",
  SUBMISSIONS: "squadgefest_submissions",
  ADMIN_AUTH: "squadgefest_admin_auth",
} as const;

const TALKS_API_PATH = "/api/talks";

// Admin password for the static site demo.
// For a production deployment, replace this with a proper server-side
// authentication solution (e.g. Next.js route handlers + environment variables).
const ADMIN_PASSWORD = "squadgefest2026";

export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === "true";
}

export function adminLogin(password: string): boolean {
  if (password === ADMIN_PASSWORD) {
    localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, "true");
    return true;
  }
  return false;
}

export function adminLogout(): void {
  localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
}

// Talks
export function getTalks(): Talk[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEYS.TALKS);
  if (!stored) return [];
  return JSON.parse(stored);
}

export function saveTalks(talks: Talk[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.TALKS, JSON.stringify(talks));
  void saveTalksToRemote(talks);
}

async function saveTalksToRemote(talks: Talk[]): Promise<void> {
  try {
    await fetch(TALKS_API_PATH, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(talks),
    });
  } catch {
    // Fall back to local storage when the API is unavailable.
  }
}

export async function refreshTalksFromRemote(): Promise<Talk[]> {
  if (typeof window === "undefined") return [];

  try {
    const response = await fetch(TALKS_API_PATH, { method: "GET" });
    if (!response.ok) return getTalks();

    const talks = (await response.json()) as Talk[];
    if (!Array.isArray(talks)) return getTalks();

    localStorage.setItem(STORAGE_KEYS.TALKS, JSON.stringify(talks));
    return talks;
  } catch {
    return getTalks();
  }
}

// Food
export function getFood(): FoodOption[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEYS.FOOD);
  if (!stored) return [];
  return JSON.parse(stored);
}

export function saveFood(food: FoodOption[]): void {
  localStorage.setItem(STORAGE_KEYS.FOOD, JSON.stringify(food));
}

// Crafts
export function getCrafts(): CraftActivity[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEYS.CRAFTS);
  if (!stored) return [];
  return JSON.parse(stored);
}

export function saveCrafts(crafts: CraftActivity[]): void {
  localStorage.setItem(STORAGE_KEYS.CRAFTS, JSON.stringify(crafts));
}

// Submissions
export function getSubmissions(): Submission[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
  if (!stored) return [];
  return JSON.parse(stored);
}

export function addSubmission(submission: Omit<Submission, "id" | "submittedAt" | "approved">): Submission {
  const submissions = getSubmissions();
  const newSubmission: Submission = {
    ...submission,
    id: `sub_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    submittedAt: new Date().toISOString(),
    approved: false,
  };
  submissions.push(newSubmission);
  localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));
  return newSubmission;
}

export function approveSubmission(submissionId: string): void {
  const submissions = getSubmissions();
  const updated = submissions.map((s) =>
    s.id === submissionId ? { ...s, approved: true } : s
  );
  localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(updated));

  // Move approved submission to the relevant list
  const submission = updated.find((s) => s.id === submissionId);
  if (!submission) return;

  if (submission.type === "talk") {
    const talks = getTalks();
    talks.push({
      id: submission.id,
      title: submission.title,
      speaker: submission.submittedBy,
      description: submission.description,
      approved: true,
    });
    saveTalks(talks);
  } else if (submission.type === "food") {
    const food = getFood();
    food.push({
      id: submission.id,
      name: submission.title,
      description: submission.description,
      category: "main",
      dietaryInfo: [],
      providedBy: submission.submittedBy,
      approved: true,
    });
    saveFood(food);
  } else if (submission.type === "craft") {
    const crafts = getCrafts();
    crafts.push({
      id: submission.id,
      name: submission.title,
      description: submission.description,
      facilitator: submission.submittedBy,
      approved: true,
    });
    saveCrafts(crafts);
  }
}

export function rejectSubmission(submissionId: string): void {
  const submissions = getSubmissions();
  const updated = submissions.filter((s) => s.id !== submissionId);
  localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(updated));
}
