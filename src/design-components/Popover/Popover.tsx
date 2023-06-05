interface PopoverProps {
  children?: React.ReactNode;
  active: boolean;
  activator: React.ReactElement;
  title?: string;
}

export function Popover({ children, active, activator, title }: PopoverProps) {
  return active ? (
    <div className="group relative inline-block">
      {activator}
      <div className="absolute right-0 z-50 mt-2 overflow-hidden rounded-md border border-neutral-200 bg-white shadow-lg shadow-neutral-300">
        <div className="bg-zinc-100 px-2 py-1 font-medium text-zinc-500">
          {title}
        </div>
        {children}
      </div>
    </div>
  ) : (
    activator
  );
}
