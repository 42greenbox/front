import { IUserRepository } from "@/domain/IUserRepository";
import { UserType } from "@/domain/User";
import fetchInstance from "@/lib/FetchInstance";

export default class FetchUserRepository implements IUserRepository {
  public getMe = async () => {
    const res = await fetchInstance("/user/me");
    const me: UserType = await res.json();
    if (!res.ok) {
      throw new Error("Failed to fetch user data");
    }
    return me;
  };

  public login = async () => {
    await fetchInstance("/ftlogin");
  };
}
