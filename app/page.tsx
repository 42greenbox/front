import Button from "@/ui/components/Button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>main</h1>
      <Link href="/home">
        <Button>go to home</Button>
      </Link>
      <Link href="/mylist">
        <Button>go to mylist</Button>
      </Link>
      <Link href="/mypage">
        <Button>go to mypage</Button>
      </Link>
    </div>
  );
}
