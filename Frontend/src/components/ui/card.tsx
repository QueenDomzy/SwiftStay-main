// src/components/ui/card.tsx
"use client";

import { ReactNode, HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div className={`bg-gray-800 rounded-lg shadow p-4 ${className || ""}`} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ children, className, ...props }: CardProps) {
  return (
    <div className={`p-2 ${className || ""}`} {...props}>
      {children}
    </div>
  );
}
