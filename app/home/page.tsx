import mockItems from "@/domain/Item";
import Item from "@/ui/components/Item";
import Link from "next/link";

export default function Home() {
  const items = mockItems;
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
