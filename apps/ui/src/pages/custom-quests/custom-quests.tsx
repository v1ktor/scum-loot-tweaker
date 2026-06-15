import { Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge.tsx';
import { Button } from '@/components/ui/button.tsx';

export function CustomQuests() {
    return (
        <div className="flex flex-1 flex-col gap-4 px-4 py-10">
            <div className="bg-muted/50 mx-auto w-full max-w-4xl rounded-xl p-8">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance mb-2">
                    Vanilla+ Custom Quests Pack
                </h1>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/20 mb-6">
                    Updated for SCUM: Into The Wild
                </Badge>

                <p className="text-sm text-muted-foreground mb-4">
                    A set of custom quests that expand the vanilla experience with new and updated objectives and
                    rewards. This is an early version — more changes and improvements are planned for future updates.
                </p>
                <p className="text-sm text-muted-foreground mb-4">Originally created by v1`, Fab and LunaDark.</p>

                <h2 className="scroll-m-20 text-xl font-semibold tracking-tight mt-8 mb-3 border-b pb-2">
                    What's inside
                </h2>
                <p className="text-sm mb-4">
                    59 new quests spread across all 4 traders — Armorer, Doctor, General Goods, and Mechanic — adding to
                    the existing vanilla quest pool, with some vanilla quests disabled and replaced. Quests come in 3
                    tiers and reward money, fame points, skill XP, and exclusive trade deals.
                </p>

                <h2 className="scroll-m-20 text-xl font-semibold tracking-tight mt-8 mb-3 border-b pb-2">
                    Installation
                </h2>
                <ol className="text-sm ml-6 list-decimal [&>li]:mt-1 text-muted-foreground">
                    <li>Download the pack below</li>
                    <li>Extract the ZIP archive</li>
                    <li>
                        Copy the{' '}
                        <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
                            Quests
                        </code>{' '}
                        folder into the SCUM config directory (merge when prompted):
                        <ul className="ml-6 list-disc mt-1">
                            <li className="mt-1">
                                <span className="text-foreground font-medium">Single-player: </span>
                                <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
                                    %LocalAppData%\SCUM\Saved\Config\WindowsNoEditor\
                                </code>
                            </li>
                            <li className="mt-1">
                                <span className="text-foreground font-medium">Multiplayer: </span>
                                <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
                                    %Server%\SCUM\Saved\Config\WindowsServer\
                                </code>
                            </li>
                        </ul>
                    </li>
                    <li>Restart your server</li>
                </ol>

                <div className="mt-10">
                    <Button asChild size="lg">
                        <a
                            href="https://github.com/v1ktor/scum-tools-custom-quests-and-loot/releases/download/quests-v0.0.1/vanilla-plus-quests-v0.0.1.zip"
                            download
                        >
                            <Download />
                            Download Pack
                        </a>
                    </Button>
                </div>
            </div>
        </div>
    );
}
