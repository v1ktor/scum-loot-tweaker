import {useState, useCallback} from 'react';
import {Button} from '@/components/ui/button.tsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.tsx';

interface ConfirmOptions {
  title: string;
  description: string;
}

export function useConfirmDialog() {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions>({title: '', description: ''});
  const [resolve, setResolve] = useState<((value: boolean) => void) | null>(null);

  const confirm = useCallback((opts: ConfirmOptions): Promise<boolean> => {
    setOptions(opts);
    setOpen(true);
    return new Promise<boolean>((res) => {
      setResolve(() => res);
    });
  }, []);

  const handleConfirm = () => {
    setOpen(false);
    resolve?.(true);
  };

  const handleCancel = () => {
    setOpen(false);
    resolve?.(false);
  };

  const dialog = (
    <Dialog open={open} onOpenChange={(v) => { if (!v) handleCancel(); }}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{options.title}</DialogTitle>
          <DialogDescription>{options.description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>Cancel</Button>
          <Button variant="destructive" onClick={handleConfirm}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return {confirm, dialog};
}
