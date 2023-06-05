import classNames from 'classnames';
import type { ReactNode } from 'react';

interface RowProps {
  children: ReactNode;
  selected?: boolean;
  highlighted?: boolean;
  onClick?(): void;
}

export function Row({ children, selected, highlighted, onClick }: RowProps) {
  const rowClassNames = classNames({
    'border-t border-slate-200': true,
    'hover:bg-zinc-100 bg-white': !selected && !highlighted,
    'bg-blue-100 hover:bg-blue-200': selected,
    'bg-orange-100 hover:bg-orange-200': highlighted,
  });

  const handleRowClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    if (onClick) {
      onClick();
      return;
    }
  };

  return (
    <tr className={rowClassNames} onClick={handleRowClick}>
      {children}
    </tr>
  );
}
