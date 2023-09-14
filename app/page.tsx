import initMocks from "@/mockserver";
import Button from "@/ui/components/Button";
import Link from "next/link";

if (process.env.NODE_ENV === "development") {
  console.log("test");
  initMocks();
}

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
