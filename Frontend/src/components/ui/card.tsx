interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div className={`rounded-lg shadow-md ${className || ""}`} {...props}>
      {children}
    </div>
  );
}
