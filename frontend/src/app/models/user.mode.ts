export type User = {
  id: number;
  username: string;
  password: string;
};

export type JWTResponse = {
  token: string;
};

export type RegisterResponce = {
  message: string;
};

export type LoginRequest = {
  username: string;
  password: string;
};

export type RegisterRequest = {
  username: string;
  password: string;
};
