import type { ReactNode } from 'react';
import { Cell, Row } from './components';

interface TableProps {
  headings: { title: string }[];
  children?: ReactNode;
}

export function Table({ headings, children }: TableProps) {
  return (
    <table className="w-full border-collapse overflow-scroll">
      <thead className="bg-zinc-100 text-left text-sm text-zinc-500">
        <tr>
          {headings.map((heading: { title: string }, index: number) => {
            return (
              <th key={`table-header-${index}`} className="p-2 font-medium">
                {heading.title}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

Table.Cell = Cell;
Table.Row = Row;
