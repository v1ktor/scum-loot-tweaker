import { useState } from 'react';
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from '@/components/ui/combobox.tsx';
import type { Option } from '@/pages/spawners/spawners.types.ts';

type FreeTextOption = Option & { custom?: boolean };

const isSameOption = (option: Option, normalizedQuery: string) =>
    option.label.toLowerCase() === normalizedQuery || option.value.toLowerCase() === normalizedQuery;

export function FreeTextCombobox({
    value,
    options,
    placeholder,
    className,
    showClear = true,
    emptyText = 'No matches.',
    onChange,
}: {
    value: string;
    options: Option[];
    placeholder?: string;
    className?: string;
    showClear?: boolean;
    emptyText?: string;
    onChange: (value: string) => void;
}) {
    const [query, setQuery] = useState('');

    const typed = query.trim();
    const items: FreeTextOption[] =
        typed && !options.some((option) => isSameOption(option, typed.toLowerCase()))
            ? [...options, { value: typed, label: query, custom: true }]
            : options;

    return (
        <Combobox
            items={items}
            itemToStringValue={(o: FreeTextOption) => o.label}
            value={options.find((o) => o.value === value) ?? (value ? { value, label: value } : null)}
            isItemEqualToValue={(a: FreeTextOption | null, b: FreeTextOption | null) => a?.value === b?.value}
            onValueChange={(next: FreeTextOption | null) => onChange(next?.value ?? '')}
            onInputValueChange={(next: string) => setQuery(next)}
            autoHighlight
        >
            <ComboboxInput placeholder={placeholder} className={className} showClear={showClear} />
            <ComboboxContent>
                <ComboboxEmpty>{emptyText}</ComboboxEmpty>
                <ComboboxList>
                    {(o: FreeTextOption) =>
                        o.custom ? (
                            <ComboboxItem key={o.value} value={o}>
                                <span className="text-muted-foreground">
                                    Use <span className="text-foreground">“{o.value}”</span>
                                </span>
                            </ComboboxItem>
                        ) : (
                            <ComboboxItem key={o.value} value={o}>
                                {o.label}
                            </ComboboxItem>
                        )
                    }
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    );
}
