import mockItems, { ItemType } from "@/domain/Item";
import ItemUI from "@/ui/components/ItemDetail";

export default function ItemModal({
  params: { id: itemId },
}: {
  params: { id: string };
}) {
  const items = mockItems;
  const item: ItemType = items.find((item) => item.id === itemId)!;

  return <ItemUI {...item} />;
}
