import { ItemSendType, ItemType } from "@/domain/Item";
import { UserType } from "../domain/User";
import DI from "../lib/DI";

export const itemService = () => {
  const itemRepository = DI.getItemRepository();

  const getItems = async () => {
    const data = await itemRepository.getItems();
    return data;
  };

  const getMyItems = async () => {
    const data = await itemRepository.getMyItems();
    return data;
  };

  const getItem = async (item: ItemType) => {
    try {
      const data = await itemRepository.getItem(item);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const takeoutItem = async (item: ItemType, status: string) => {
    itemRepository.putItem(item, status);
  };

  const addItem = async (user: UserType, item: ItemSendType) => {
    itemRepository.postItem(user, item);
  };
  return { getItems, addItem, takeoutItem, getMyItems, getItem };
};
