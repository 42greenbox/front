import { ItemSendType, ItemType } from "./Item";
import { UserType } from "./User";

export interface IItemRepository {
  getItems(): Promise<ItemType[]>;
  getItem(item: ItemType): Promise<ItemType>;
  getMyItems(): Promise<ItemType[]>;
  putItem(item: ItemType, status: string): void;
  postItem(user: UserType, item: ItemSendType): void;
}
