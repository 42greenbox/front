import { ItemSendType, ItemType } from "@/domain/Item";
import { UserType } from "../domain/User";
import DI from "../lib/DI";

export const useItem = () => {
  const itemRepository = DI.getItemRepository();

  const getItems = async () => {
    try {
      const data = await itemRepository.getItems();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const getMyItems = async () => {
    try {
      const data = await itemRepository.getMyItems();
      return data;
    } catch (error) {
      console.log(error);
    }
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
    try {
      itemRepository.putItem(item, status);
    } catch (error) {
      console.log(error);
    }
  };

  const addItem = (user: UserType, item: ItemSendType) => {
    try {
      itemRepository.postItem(user, item);
    } catch (error) {
      console.error(error);
    }
  };
  return { getItems, addItem, takeoutItem, getMyItems, getItem };
};
