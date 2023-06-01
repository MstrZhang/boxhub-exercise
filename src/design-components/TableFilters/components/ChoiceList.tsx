interface ChoiceListProps {
  choices: { label: string; value: string }[];
  selected?: string[];
  onChange?(value: string): void;
}

export function ChoiceList({ choices, selected, onChange }: ChoiceListProps) {
  const handleChoiceSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(event.target.value);
  };

  return (
    <div className="flex h-full flex-col gap-1">
      {choices.map(
        (choice: { label: string; value: string }, index: number) => {
          return (
            <div key={`choice-${choice.value}-${index}`}>
              <input
                className="mr-1"
                type="checkbox"
                value={choice.value}
                defaultChecked={selected?.includes(choice.value)}
                onChange={handleChoiceSelect}
              />{' '}
              {choice.label}
            </div>
          );
        }
      )}
    </div>
  );
}
