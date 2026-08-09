import {InfoIcon} from 'lucide-react';
import {type ReactNode, useState} from 'react';
import {Button} from '@/components/ui/button.tsx';
import {ButtonGroup} from '@/components/ui/button-group.tsx';
import {Input} from '@/components/ui/input.tsx';
import {
  SelectContent,
  SelectItem,
  Select as SelectRoot,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import {Switch} from '@/components/ui/switch.tsx';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip.tsx';
import {cn} from '@/lib/utils.ts';

export function tabErrorClass(hasError: boolean): string | undefined {
  return hasError
    ? 'text-destructive data-[state=active]:text-destructive dark:text-destructive dark:data-[state=active]:text-destructive'
    : undefined;
}

export function Field({
                        label,
                        children,
                        className,
                        required,
                        error,
                        hint,
                      }: {
  label: ReactNode;
  children: ReactNode;
  className?: string;
  required?: boolean;
  error?: string;
  hint?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span>
                    {label}
                  {required && <span className="ml-0.5 text-destructive">*</span>}
                </span>
              {hint && <InfoHint text={hint}/>}
            </span>
      {children}
      {error && <span className="text-xs text-destructive">{error}</span>}
    </div>
  );
}

export function TextInput({
                            value,
                            onChange,
                            placeholder,
                          }: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return <Input value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)}/>;
}

export function NumberInput({
                              value,
                              onChange,
                              placeholder,
                              step,
                              hint,
                            }: {
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  placeholder?: string;
  step?: number;
  hint?: string;
}) {
  const input = (
    <Input
      type="number"
      step={step}
      value={value ?? ''}
      placeholder={placeholder}
      onChange={(e) => {
        const raw = e.target.value;
        onChange(raw === '' ? undefined : Number(raw));
      }}
    />
  );

  if (!hint) return input;

  return (
    <ButtonGroup className="w-full">
      {input}
      <HintButton hint={hint}/>
    </ButtonGroup>
  );
}

export function InfoHint({text}: {text: string}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className="inline-flex text-muted-foreground transition-colors hover:text-foreground"
          >
            <InfoIcon className="h-3.5 w-3.5"/>
          </button>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">{text}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function HintButton({hint}: {hint: string}) {
  const [open, setOpen] = useState(false);

  return (
    <TooltipProvider>
      <Tooltip open={open} onOpenChange={() => {
      }}>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setOpen((prev) => !prev)}
            onBlur={() => setOpen(false)}
          >
            <InfoIcon/>
          </Button>
        </TooltipTrigger>
        <TooltipContent>{hint}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function BoolSwitch({
                             label,
                             checked,
                             onChange,
                           }: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-3 text-sm">
      <span className="flex-none">{label}</span>
      <span className="flex-1 self-center border-b border-dotted border-muted-foreground/30"/>
      <Switch checked={checked} onCheckedChange={onChange}/>
    </label>
  );
}

export function Select<T extends string>({
                                           value,
                                           options,
                                           onChange,
                                           placeholder,
                                         }: {
  value: T;
  options: readonly {value: T; label: string}[];
  onChange: (value: T) => void;
  placeholder?: string;
}) {
  return (
    <SelectRoot value={value} onValueChange={(next) => onChange(next as T)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder}/>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}

const NONE_VALUE = '__none__';

export function OptionalSelect<T extends string>({
                                                   value,
                                                   options,
                                                   onChange,
                                                 }: {
  value: T | undefined;
  options: readonly T[];
  onChange: (value: T | undefined) => void;
}) {
  return (
    <SelectRoot
      value={value ?? NONE_VALUE}
      onValueChange={(next) => onChange(next === NONE_VALUE ? undefined : (next as T))}
    >
      <SelectTrigger className="w-full">
        <SelectValue/>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={NONE_VALUE}>—</SelectItem>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}
