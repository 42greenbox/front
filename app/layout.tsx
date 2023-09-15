//import StateMachineProvider from "./machine-provider";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("@/mockserver");
}

export const metadata = {
  title: "GreenBox",
  description: "Green Box Demo",
  manifest: "manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
