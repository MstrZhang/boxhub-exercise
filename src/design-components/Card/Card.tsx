import classNames from 'classnames';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  const cardClasses = classNames(
    'border border-neutral-200 rounded-xl shadow-lg shadow-neutral-300',
    className
  );

  return <div className={cardClasses}>{children}</div>;
}
