import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

interface SelectedFilters {
  [key: string]: string[];
}

interface UseFiltersProps {
  filterKeys: string[];
}

export function useFilters({ filterKeys }: UseFiltersProps) {
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>(
    filterKeys.reduce((acc: {}, val: string) => ({ ...acc, [val]: [] }), {})
  );
  const [_, setSearchParams] = useSearchParams();

  useEffect(() => {
    Object.keys(selectedFilters).forEach((filterName: string) => {
      if (selectedFilters[filterName].length) {
        setSearchParams((searchParams) => {
          searchParams.set(filterName, selectedFilters[filterName].join(','));
          return searchParams;
        });
      } else {
        setSearchParams((searchParams) => {
          searchParams.delete(filterName);
          return searchParams;
        });
      }
    });
  }, [selectedFilters]);

  const handleFilterSelect = (key: string, value: string) => {
    setSelectedFilters((prevState: SelectedFilters) => {
      if (prevState[key].includes(value)) {
        return {
          ...prevState,
          [key]: [...prevState[key].filter((item: string) => item !== value)],
        };
      }
      return {
        ...prevState,
        [key]: [...prevState[key], value],
      };
    });
  };

  return { selectedFilters, handleFilterSelect };
}
