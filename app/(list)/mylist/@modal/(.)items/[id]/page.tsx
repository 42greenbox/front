import { itemService } from "@/application/useItem";
import { ItemType } from "@/domain/Item";
import ItemUI from "@/ui/components/ItemDetail";

export default async function ItemModal({
  params: { id: id },
}: {
  params: { id: string };
}) {
  const { getMyItems } = itemService();
  const items = await getMyItems();
  const item: ItemType = items.find(item => item.id === id)!;
  return <ItemUI {...item} />;
}
