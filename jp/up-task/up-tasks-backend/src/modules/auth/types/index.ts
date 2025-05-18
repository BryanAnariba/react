export type JwtPayload = {
  _id: string;
  email: string;
  name: string;
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
