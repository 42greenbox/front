import { IUserRepository } from "../domain/IUserRepository";
import { UserType } from "../domain/User";
import { http } from "../lib/HttpClient";

export default class UserRepository implements IUserRepository {
  public getUserMe = async () => {
    return await http
      .get<UserType>("/user/me")
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  };

  public login = async () => {
    try {
      await http.get("/ftlogin");
      //const cookie = getCookie("token");
      //console.log(cookie);
      //deleteCookie("token");
    } catch (error) {
      console.error("login error", error);
    }
  };
}
