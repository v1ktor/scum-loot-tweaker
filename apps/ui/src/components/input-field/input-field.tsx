import { InfoIcon, XIcon } from 'lucide-react';
import { type ReactNode, useState } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { ButtonGroup } from '@/components/ui/button-group.tsx';
import { Field, FieldLabel } from '@/components/ui/field.tsx';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group.tsx';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip.tsx';

interface Props {
    value: string | number;
    id: string;
    label: string;
    onChange?: (value: string) => void;
    onClear?: () => void;
    tooltipContent?: ReactNode;
}

export function InputField(props: Props) {
    const { value, id, label, onChange, onClear, tooltipContent } = props;
    const [tooltipOpen, setTooltipOpen] = useState(false);

    return (
        <Field className="grid w-full max-w- items-center gap-1 pb-4">
            <FieldLabel htmlFor={id}>{label}:</FieldLabel>
            <ButtonGroup>
                <InputGroup>
                    <InputGroupInput id={id} value={value} onChange={(e) => onChange?.(e.target.value)} />
                    {value !== '' && value !== undefined && (
                        <InputGroupAddon align="inline-end">
                            <button
                                type="button"
                                onClick={onClear}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                <XIcon className="h-4 w-4 mr-1" />
                            </button>
                        </InputGroupAddon>
                    )}
                </InputGroup>
                {tooltipContent && (
                    <Tooltip open={tooltipOpen} onOpenChange={() => {}}>
                        <TooltipTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
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
