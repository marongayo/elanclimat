export interface Message {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message?: string;
  createdAt: string;
  read: boolean;
}
