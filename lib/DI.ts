import { IScannerRepository } from "@/domain/IScannerRepository";
import FetchItemRepository from "@/infrastructure/FetchItemRepository";
import FetchUserRepository from "@/infrastructure/FetchUserRepository";
import ZxingScannerRepository from "@/infrastructure/ZxingScannerRepository";
import { IItemRepository } from "../domain/IItemRepository";
import { IUserRepository } from "../domain/IUserRepository";

//TODO: Repository 실제로 DI 할 수 있게 (인자로 어떤 레포지토리를 쓸지 받아올 수 있게) 변경
class DI {
  private static ItemRepository: IItemRepository = new FetchItemRepository();
  private static UserRepository: IUserRepository = new FetchUserRepository();
  private static ScannerRepository: IScannerRepository =
    new ZxingScannerRepository();

  public static getItemRepository = () => {
    return this.ItemRepository;
  };

  public static getUserRepository = () => {
    return this.UserRepository;
  };

  public static getScannerRepository = () => {
    return this.ScannerRepository;
  };
}

export default DI;
