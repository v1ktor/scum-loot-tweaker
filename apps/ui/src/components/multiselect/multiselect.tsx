import { InfoIcon, XIcon } from 'lucide-react';
import { Fragment, type ReactNode, useState } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { ButtonGroup } from '@/components/ui/button-group.tsx';
import {
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList,
    ComboboxTrigger,
    ComboboxValue,
    useComboboxAnchor,
} from '@/components/ui/combobox.tsx';
import { Field } from '@/components/ui/field.tsx';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip.tsx';
import type { Option } from '@/pages/spawners/Spawners.types.ts';

interface MultiSelectProps {
    id: string;
    label: string;
    placeholder?: string;
    items: Option[];
    values: string[];
    onValueChange: (values: Option[]) => void;
    onClear?: () => void;
    tooltipContent?: ReactNode;
}

export function MultiSelect(props: MultiSelectProps) {
    const { id, label, placeholder, items, values, onValueChange, onClear, tooltipContent } = props;
    const anchorRef = useComboboxAnchor();
    const [tooltipOpen, setTooltipOpen] = useState(false);

    return (
        <Field className="grid w-full max-w-full items-center gap-1 pb-4">
            <label className="text-sm font-medium" htmlFor={id}>
                {label}
            </label>
            <ButtonGroup className="w-full">
                <Combobox
                    multiple
                    autoHighlight
                    items={items}
                    itemToStringValue={(item: Option) => item.label}
                    value={items.filter((opt) => values.includes(opt.value)) ?? []}
                    onValueChange={onValueChange}
                >
                    <div className="relative w-full" ref={anchorRef}>
                        <ComboboxChips className="w-full rounded-r-none" style={{ paddingRight: '3rem' }}>
                            <ComboboxValue>
                                {(selected: Option[]) => (
                                    <Fragment>
                                        {selected.map((item) => (
                                            <ComboboxChip key={item.value}>{item.label}</ComboboxChip>
                                        ))}
                                        <ComboboxChipsInput
                                            className="placeholder:text-muted-foreground w-0 min-w-0 flex-1 truncate"
                                            placeholder={placeholder}
                                        />
                                    </Fragment>
                                )}
                            </ComboboxValue>
                        </ComboboxChips>
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                            {values && values.length > 0 && (
                                <button
                                    type="button"
                                    className="text-muted-foreground hover:text-foreground"
                                    onClick={onClear}
                                >
                                    <XIcon className="size-4" />
                                </button>
                            )}
                            <ComboboxTrigger className="text-muted-foreground" />
                        </div>
                    </div>
                    <ComboboxContent anchor={anchorRef}>
                        <ComboboxEmpty>No items found.</ComboboxEmpty>
                        <ComboboxList>
                            {(item: Option) => (
                                <ComboboxItem key={item.value} value={item}>
                                    {item.label}
                                </ComboboxItem>
                            )}
                        </ComboboxList>
                    </ComboboxContent>
                </Combobox>
                {tooltipContent && (
                    <Tooltip open={tooltipOpen} onOpenChange={() => {}}>
                        <TooltipTrigger asChild>
                            <Button
                                variant="outline"
                                className="rounded-l-none border-l-0 px-2 h-auto w-9"
                                onClick={() => setTooltipOpen((prev) => !prev)}
                                onBlur={() => setTooltipOpen(false)}
                            >
                                <InfoIcon />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent className="pr-1.5">
                            <div className="flex items-center gap-2">{tooltipContent}</div>
                        </TooltipContent>
                    </Tooltip>
                )}
            </ButtonGroup>
        </Field>
    );
}
