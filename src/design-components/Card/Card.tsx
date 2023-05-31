interface CardProps {
  children: React.ReactNode;
}

export function Card({ children }: CardProps) {
  return <div className="rounded-xl shadow-md">{children}</div>;
}
