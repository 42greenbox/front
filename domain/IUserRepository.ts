import { UserType } from "./User";

export interface IUserRepository {
  getUserMe(): Promise<UserType | Error>;
  login(): Promise<void>;
}
