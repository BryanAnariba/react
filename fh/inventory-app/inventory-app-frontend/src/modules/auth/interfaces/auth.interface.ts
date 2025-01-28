export interface LoggedUser {
  loggedUser: LoggedUserData;
}

export interface LoggedUserData {
  _id: string;
  email: string;
  name: string;
  role: Role;
}

export interface AuthResponse {
  user: LoggedUserData;
  token: string;
}

export interface Role {
  _id: string;
  name: string;
}

export interface SignUpForm {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export interface SignInForm {
  email: string;
  password: string;
}