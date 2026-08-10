import type { LucideIcon } from 'lucide-react';

export function SectionHeader({ icon: Icon, title }: { icon: LucideIcon; title: string }) {
    return (
        <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
            <Icon className="h-5 w-5 text-muted-foreground" />
            {title}
        </h2>
    );
}
