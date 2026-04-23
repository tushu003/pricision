export type UserRole = "user" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
}

export interface UserPublic {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}
