import { UserRoles } from "src/modules/users/enums";

export type JwtPayload = {
  _id: string;
  email: string;
  name: string;
  roles: UserRoles[];
};

export type AuthResponse = {
  user: {
    _id: string;
    email: string;
    name: string;
  };
  token: string;
  emailSent: boolean;
};
