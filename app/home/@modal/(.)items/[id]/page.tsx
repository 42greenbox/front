import { getItems } from "@/app/home/page";
import { ItemType } from "@/domain/Item";
import ItemUI from "@/ui/components/ItemDetail";

export default async function ItemModal({
  params: { id: itemId },
}: {
  params: { id: string };
}) {
  const items = await getItems();
  const item: ItemType = items.find((item) => item.id === itemId)!;

  return <ItemUI {...item} />;
}
