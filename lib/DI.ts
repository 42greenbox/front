import FetchItemRepository from "@/infrastructure/FetchItemRepository";
import { IItemRepository } from "../domain/IItemRepository";
import { IUserRepository } from "../domain/IUserRepository";
import UserRepository from "../infrastructure/UserRepository";

//TODO: Repository 실제로 DI 할 수 있게 (인자로 어떤 레포지토리를 쓸지 받아올 수 있게) 변경
class DI {
  private static ItemRepository: IItemRepository = new FetchItemRepository();
  private static UserRepository: IUserRepository = new UserRepository();

  public static getItemRepository = () => {
    return this.ItemRepository;
  };

  public static getUserRepository = () => {
    return this.UserRepository;
  };
}

export default DI;
