import {Field, FieldContent, FieldLabel} from '@/components/ui/field.tsx';
import {Tooltip, TooltipContent, TooltipTrigger} from '@/components/ui/tooltip.tsx';
import {InfoIcon} from 'lucide-react';
import {Switch} from '@/components/ui/switch.tsx';
import {ReactNode, useState} from 'react';

interface SwitchFieldProps {
  tooltipContent?: ReactNode;
  checked?: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
  id: string;
}

export function SwitchField(props: SwitchFieldProps) {
  const {tooltipContent, checked, onCheckedChange, label, id} = props;
  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <Field orientation="horizontal" className="max-w-164 items-center pt-2 pb-2">
      <FieldContent className="flex-none">
        <FieldLabel htmlFor={id}>
          {label}
          {tooltipContent && (
            <Tooltip open={tooltipOpen} onOpenChange={() => {
            }}>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={() => setTooltipOpen((prev) => !prev)}
                  onBlur={() => setTooltipOpen(false)}
                >
                  <InfoIcon size="16"/>
                </button>
              </TooltipTrigger>
              <TooltipContent className="pr-1.5">
                <div className="flex items-center gap-2 max-w-md">
                  {tooltipContent}
                </div>
              </TooltipContent>
            </Tooltip>
          )}
        </FieldLabel>
      </FieldContent>
      <span className="flex-1 border-b border-dotted border-muted-foreground/30 self-center"/>
      <Switch id={id} checked={checked ?? false} onCheckedChange={onCheckedChange}/>
    </Field>
  )
}
