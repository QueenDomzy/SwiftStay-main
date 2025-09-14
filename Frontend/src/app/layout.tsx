import "./globals.css";
import type { Metadata } from "next";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "SwiftStay",
  description: "Hotel reservation and management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="p-4">{children}</div>
      </body>
    </html>
  );
}
