import { UserRoleEnum } from "./entities/user-role.enum";


export interface UserI {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  salt?: string;
  role?: string
}

export interface LoginResponseI {
  access_token: string;
  token_type: string;
  expires_in: number;
}