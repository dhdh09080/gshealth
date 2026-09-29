export type ExamType = "general" | "special" | "preplacement";
export type ReviewStatus = "ok" | "review" | "reupload";

export type HealthRecord = {
  id: string;
  uploadDate: string;
  siteCode: string;
  companyCode: string;
  companyName: string;
  workerName: string;
  birthDate: string;
  age: number;
  phoneLast4: string;
  jobType: string;
  examDate: string;
  examType: ExamType;
  resultCode: string;
  note: string;
  hazards: string[];
  hasSecondaryForR: boolean;
  sourceFileName: string;
  reviewStatus: ReviewStatus;
  confidence: number;
  issues: string[];
};

export type RuleSettings = {
  under63Months: number;
  over63Months: number;
  requiredHazards: string[];
  requireSecondaryForR: boolean;
};
