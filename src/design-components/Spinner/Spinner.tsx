import { CircleNotch } from '@phosphor-icons/react';

export function Spinner() {
  return (
    <CircleNotch
      className="animate-spin text-neutral-300"
      size={84}
      weight="bold"
    />
  );
}
