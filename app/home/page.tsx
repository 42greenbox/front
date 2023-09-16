import { itemService } from "@/application/useItem";
import Button from "@/ui/components/Button";
import Item from "@/ui/components/Item";
import Link from "next/link";

export default async function Home() {
  const { getItems } = itemService();
  const items = await getItems();

  return (
    <>
      <h1>home</h1>
      <>
        {items.map(({ id, img, title, share, expiredAt }) => (
          <Link key={id} href={`/items/${id}`}>
            <Item img={img} title={title} share={share} expiredAt={expiredAt} />
          </Link>
        ))}
        <Link href={"/add"}>
          <Button>add</Button>
        </Link>
      </>
    </>
  );
}
