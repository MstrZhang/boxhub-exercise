import type { ReactNode } from 'react';
import classNames from 'classnames';

interface BadgeProps {
  children?: ReactNode;
  status?: 'success' | 'attention' | 'warning';
}

export function Badge({ children, status }: BadgeProps) {
  const badgeClassNames = classNames({
    'inline px-2.5 py-0.5 rounded-full text-center text-sm bg-zinc-300': true,
    'bg-green-400': status === 'success',
    'bg-yellow-400': status === 'attention',
    'bg-orange-400': status === 'warning',
    'bg-zinc-300': !status,
  });

  return <div className={badgeClassNames}>{children}</div>;
}
