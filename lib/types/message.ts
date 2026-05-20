export interface Message {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message?: string;
  date: string;
  read: boolean;
  createdAt: string;
  archived: boolean;
}
