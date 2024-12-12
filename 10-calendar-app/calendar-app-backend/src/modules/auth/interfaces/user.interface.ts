export interface AuthResponse {
  token: string;
  user: LoggedUser;
}

export interface LoggedUser {
  _id: string;
  name: string;
  email: string;
}
