export type SubmissionType = "talk" | "food" | "craft" | "other";

export interface Submission {
  id: string;
  type: SubmissionType;
  title: string;
  description: string;
  submittedBy: string;
  submittedByEmail: string;
  submittedAt: string;
  approved: boolean;
  extraInfo?: string;
}

export interface Talk {
  id: string;
  title: string;
  speaker: string;
  description: string;
  day?: string;
  time?: string;
  duration?: string;
  approved: boolean;
}

export interface FoodOption {
  id: string;
  name: string;
  description: string;
  category: "main" | "snack" | "drink" | "dessert";
  dietaryInfo: string[];
  providedBy: string;
  approved: boolean;
}

export interface CraftActivity {
  id: string;
  name: string;
  description: string;
  facilitator: string;
  ageGroup?: string;
  materials?: string;
  duration?: string;
  approved: boolean;
}
