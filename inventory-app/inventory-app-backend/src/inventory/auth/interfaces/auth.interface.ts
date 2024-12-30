export interface AuthResponse {
  token: string;
  user: LoggedUser;
}

export interface Role {
  _id: string;
  name: string;
}

export interface LoggedUser {
  _id: string;
  name: string;
  email: string;
  role: Role;
}