import { IItemRepository } from "@/domain/IItemRepository";
import { ItemDto, ItemSendType, ItemType } from "@/domain/Item";
import { UserType } from "@/domain/User";
import fetchInstance from "@/lib/FetchInstance";

export default class FetchItemRepository implements IItemRepository {
  public getItems = async () => {
    const res = await fetchInstance("/storage");
    const rawItems: ItemDto[] = await res.json();
    const items: ItemType[] = rawItems.map((dto) => {
      return {
        id: dto.item_id,
        img: dto.img,
        owner: dto.user_id,
        title: dto.title,
        expiredAt: dto.expiredAt,
        location: dto.location,
        share: dto.share,
        rental: dto.rental,
      };
    });
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }

    return items;
  };
  public getMyItems = async () => {
    const res = await fetchInstance("/storage/me");
    const rawItems: ItemDto[] = await res.json();
    const items: ItemType[] = rawItems.map((dto) => {
      return {
        id: dto.item_id,
        img: dto.img,
        owner: dto.user_id,
        title: dto.title,
        expiredAt: dto.expiredAt,
        location: dto.location,
        share: dto.share,
        rental: dto.rental,
      };
    });
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }

    return items;
  };

  public getItem = async (item: ItemType) => {
    const res = await fetchInstance(
      `/storage?user_id=${item.owner}&item_id=${item.id}`
    );
    const rawItem: ItemDto = await res.json();
    const itemm: ItemType = {
      id: rawItem.item_id,
      img: rawItem.img,
      owner: rawItem.user_id,
      title: rawItem.title,
      expiredAt: rawItem.expiredAt,
      location: rawItem.location,
      share: rawItem.share,
      rental: rawItem.rental,
    };
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }
    return itemm;
  };

  public putItem(item: ItemType, status: string): void {}
  public postItem(user: UserType, item: ItemSendType): void {}
}
