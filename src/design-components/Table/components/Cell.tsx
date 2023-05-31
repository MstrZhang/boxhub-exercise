import classNames from 'classnames';
import type { ReactNode } from 'react';

interface CellProps {
  children?: ReactNode;
  className?: string;
}

export function Cell({ children, className }: CellProps) {
  const cellClassNames = classNames(className, 'p-2 text-left');

  return <td className={cellClassNames}>{children}</td>;
}
