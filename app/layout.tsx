import type { Metadata } from "next";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "GynecomastiadMD",
  description: "Medical site specializing in gynecomastia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main style={{ padding: "2rem" }}>{children}</main>
      </body>
    </html>
  );
}
