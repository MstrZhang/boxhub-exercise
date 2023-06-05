import classNames from 'classnames';
import type { ReactNode } from 'react';

interface CellProps {
  children?: ReactNode;
  className?: string;
}

export function Cell({ children, className }: CellProps) {
  const cellClassNames = classNames(className, 'px-4 py-2 text-left');

  return <td className={cellClassNames}>{children}</td>;
}
