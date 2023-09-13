import { ItemSendType, ItemType } from "./Item";
import { UserType } from "./User";

export interface IItemRepository {
  getItems(): Promise<ItemType[] | Error>;
  getItem(item: ItemType): Promise<ItemType | Error>;
  getMyItems(): Promise<ItemType[] | Error>;
  putItem(item: ItemType, status: string): void;
  postItem(user: UserType, item: ItemSendType): void;
}
