// lib/types/jobs.ts

export interface Applicant {
  _id?: string;
  fullName: string;
  email: string;
  phone?: string;
  linkedin?: string;
  coverLetter: string;
  cvUrl: string;
  appliedAt?: string;
}

export interface Job {
  _id?: string;
  title: string;
  description: string;
  category: string;
  type: string;
  requirements: string[];
  location: string;
  applicants?: Applicant[];
  created_at?: string;
  updated_at?: string;
}

export type JobForm = Omit<Job, "_id" | "applicants">;
