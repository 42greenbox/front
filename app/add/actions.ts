"use server";
import { itemService } from "@/application/useItem";
import { userService } from "@/application/userService";
import { ItemSendType } from "@/domain/Item";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function create(formData: FormData) {
  const { addItem } = itemService();
  const { getMe } = userService();
  try 
  {
    const user = await getMe();
    const item: ItemSendType = {
    itemId: formData.get("itemId") as string,
    owner: user.id,
    title: formData.get("title") as string,
    img: formData.get("img") as string,
    expiryDate: formData.get("expiaryDate") as string,
    share: formData.get("share") as string,
    rental: formData.get("rental") as string,
    location: formData.get("location") as string,
  };
  await addItem(user, item);
  revalidateTag("items");
  redirect(`/items/${item.itemId}`);
  return {message: "success"};
  }
  catch (error) {
    console.log("***************error**********", error);
    return {message: "there was an error"};
  }
}
