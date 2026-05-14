export type Role = "admin" | "superadmin";
export type Tab = "dashboard" | "blog" | "products" | "admins";

export interface AdminForm {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface AdminFormErrors {
  name?: string;
  email?: string;
  password?: string;
}
