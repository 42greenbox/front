"use server";
import { itemService } from "@/application/useItem";
import { userService } from "@/application/userService";
import fetchInstance from "@/lib/FetchInstance";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function create(formData: FormData) {
  const { addItem } = itemService();
  const { getMe } = userService();
  const itemId = formData.get("item_id") as string;
  try {
    console.log("***************line14**************");
    console.log("*********before go to function********", formData.get("img"));
    //const blob = await base64ToBlob(formData.get("img") as string);
    console.log("***************line16**************");
    //await addItem(user, item);
    //formData.append("img", blob);
    await fetchInstance("/storage", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data;",
      },
      body: formData,
    });
    revalidateTag("items");
    //return {message: "success"};
  } catch (error) {
    console.log("***************error**********", error);
    return { message: "there was an error" };
  }
  redirect(`/items/${itemId}`);
}

const base64ToBlob = async (base64: string) => {
  console.log("********insideof function*********", base64);
  const blob = await fetch(base64).then(res => res.blob());
  console.log("*********after fetch file*********", blob);
  return blob;
};
