import { ReactNode, HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function BookingCard({ children, className, ...props }: CardProps) {
  return (
    <div className={`p-4 bg-gray-800 rounded-lg ${className || ""}`} {...props}>
      {children}
    </div>
  );
}
