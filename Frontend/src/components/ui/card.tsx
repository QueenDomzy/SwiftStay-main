import { ReactNode, HTMLAttributes } from "react";

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardContent({ children, className, ...props }: CardContentProps) {
  return (
    <div className={`p-4 ${className || ""}`} {...props}>
      {children}
    </div>
  );
                           }
