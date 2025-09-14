"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  return (
    <nav className="bg-gray-900 text-white p-4 flex gap-6 shadow-md">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`hover:text-blue-400 ${
            pathname === link.href ? "text-blue-500 font-bold" : ""
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
     }
