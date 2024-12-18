export interface LoggedUser {
  _id: string;
  email: string;
  name: string;
  role: Role;
}

export interface Role {
  _id: string;
  name: string;
}