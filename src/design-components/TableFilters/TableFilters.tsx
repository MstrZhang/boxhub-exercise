import { useState } from 'react';
import { FunnelSimple } from '@phosphor-icons/react';
import { TableFilterMenu } from './components';
import { FilterConfig } from './components/types';

interface TableFiltersProps {
  filters: FilterConfig[];
}

export function TableFilters({ filters }: TableFiltersProps) {
  const [showFilterMenu, setShowFilterMenu] = useState<boolean>(false);

  return (
    <div className="relative bg-white">
      <div className="flex flex-row-reverse p-2">
        <button
          className="rounded border border-slate-300 px-2 py-1 hover:bg-zinc-100"
          onClick={() => setShowFilterMenu((prevState) => !prevState)}
        >
          <FunnelSimple size={24} className="text-slate-600" />
        </button>
      </div>
      {showFilterMenu && <TableFilterMenu filters={filters} />}
    </div>
  );
}
