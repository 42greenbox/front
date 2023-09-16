import { itemService } from "@/application/useItem";
import Item from "@/ui/components/Item";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Home() {
  const { getItems } = itemService();
  const items = await getItems();
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  return (
    <>
      <h1>home</h1>
      <>
        {items.map(({ id, img, title, share, expiredAt }) => (
          <Link key={id} href={`/items/${id}`}>
            <Item img={img} title={title} share={share} expiredAt={expiredAt} />
          </Link>
        ))}
      </>
    </>
  );
}
