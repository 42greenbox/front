import { IItemRepository } from "@/domain/IItemRepository";
import {
  ItemDto,
  ItemSendType,
  ItemType,
  totalPointToUse,
} from "@/domain/Item";
import { UserType, hasEnoughPoint } from "@/domain/User";
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
      `/storage?user_id=${item.owner}&item_id=${item.id}`,
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

  public putItem = async (item: ItemType, status: string) => {
    const newItem = { ...item, item_id: item.id, user_id: item.owner, status };
    await fetchInstance("/storage", {
      method: "PUT",
      body: JSON.stringify(newItem),
    });
    //await http.put("/storage", newItem).catch((err) => console.log(err));
  };
  public postItem = async (user: UserType, item: ItemSendType) => {
    if (hasEnoughPoint(user, totalPointToUse(item))) {
      const blob = await base64ToBlob(item.img);
      const formData = new FormData();
      formData.append("user_id", item.owner);
      formData.append("item_id", item.itemId!);
      formData.append("title", item.title);
      formData.append("img", blob);
      formData.append("expiryDate", item.expiryDate);
      formData.append("share", item.share);
      formData.append("rental", item.rental);
      formData.append("location", item.location);

      await fetchInstance("/storage", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data;",
        },
        body: formData,
      });
    }
  };
}

const base64ToBlob = async (base64: string) => {
  const blob = await fetch(base64).then((res) => res.blob());
  return blob;
};
