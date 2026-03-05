import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GynecomastiadMD",
  description: "Sitio médico sobre ginecomastia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <header style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
          <h1>GynecomastiadMD</h1>
        </header>
        <main style={{ padding: "2rem" }}>{children}</main>
      </body>
    </html>
  );
}
