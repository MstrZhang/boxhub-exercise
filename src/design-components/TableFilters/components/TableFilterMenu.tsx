import { useState } from 'react';
import classNames from 'classnames';
import { FilterConfig } from './types';

interface TableFilterMenuProps {
  filters: FilterConfig[];
}

export function TableFilterMenu({ filters }: TableFilterMenuProps) {
  const [selectedFilter, setSelectedFilter] = useState<FilterConfig>(
    filters[0]
  );

  return (
    <div className="absolute right-2 flex divide-x divide-slate-200 rounded-md bg-white shadow-lg">
      <div className="flex flex-col p-4">
        <div className="text-sm font-medium text-slate-500">Filter by</div>
        {filters.map((filter: FilterConfig) => {
          return (
            <button
              key={filter.key}
              className={classNames({
                'mt-2 rounded px-2 text-left hover:bg-sky-500/20': true,
                'bg-sky-500/20 text-sky-600': selectedFilter.key === filter.key,
              })}
              onClick={() => setSelectedFilter(filter)}
            >
              {filter.label}
            </button>
          );
        })}
      </div>
      <div className="w-48 flex-grow p-4">{selectedFilter.filter}</div>
    </div>
  );
}
