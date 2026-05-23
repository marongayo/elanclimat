// lib/types/admin.ts

export type Role = "admin" | "superadmin";
export type Tab = "dashboard" | "blog" | "products" | "admins" | "myaccount";

export interface AdminForm {
  name: string;
  email: string;
  password?: string; // optional — blank in edit mode means "keep existing password"
  role: Role;
}

export interface AdminFormErrors {
  name?: string;
  email?: string;
  password?: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}
