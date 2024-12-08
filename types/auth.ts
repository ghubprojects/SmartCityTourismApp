export interface UserType {
  username: string;
  email: string;
  password: string;
  avatar: string;
}

export interface AuthState {
  user: UserType | null;
  token: string;
}

export interface JwtPayload {
  sub: string;
  name: string;
  exp: number;
  iss: string;
  aud: string;
}
