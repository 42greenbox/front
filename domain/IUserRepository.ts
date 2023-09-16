import { UserType } from "./User";

export interface IUserRepository {
  getMe(): Promise<UserType>;
  login(): Promise<void>;
}
