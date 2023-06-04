import classNames from 'classnames';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  const cardClasses = classNames('rounded-xl shadow-md', className);

  return <div className={cardClasses}>{children}</div>;
}
