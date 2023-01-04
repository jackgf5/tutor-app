import "./globals.css";
import Providers from "../lib/providers";
import Navbar from "./(modules)/Navbar/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        {/* @ts-expect-error Async Server Component */}
        <Navbar />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
