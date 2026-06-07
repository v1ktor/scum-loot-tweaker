import { Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge.tsx';
import { Button } from '@/components/ui/button.tsx';

export function CustomSpawners() {
    return (
        <div className="flex flex-1 flex-col gap-4 px-4 py-10">
            <div className="bg-muted/50 mx-auto w-full max-w-4xl rounded-xl p-8">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance mb-2">
                    Vanilla+ Custom Spawners Pack
                </h1>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/20 mb-6">
                    Updated for SCUM: Into The Wild
                </Badge>

                <p className="text-sm text-muted-foreground mb-4">
                    A set of custom spawner overrides that improve the vanilla loot experience. This is an early version
                    — more changes and improvements are planned for future updates.
                </p>
                <p className="text-sm text-muted-foreground mb-4">Originally created by v1`, Fab and LunaDark.</p>

                <h2 className="scroll-m-20 text-xl font-semibold tracking-tight mt-8 mb-3 border-b pb-2">
                    What's changed
                </h2>
                <ul className="text-sm ml-6 list-disc [&>li]:mt-2 text-muted-foreground">
                    <li>
                        <span className="text-foreground font-medium">Cargo drops reworked</span> — most vanilla cargo
                        drops have been replaced with more rewarding loot: ammo boxes, explosives and military gear
                        instead of civilian tools and food items
                    </li>
                    <li>
                        <span className="text-foreground font-medium">Weapons Factory</span> — increased spawn
                        probability for tarps and military crates, added a slight chance to find explosives, and removed
                        flares from lockers
                    </li>
                    <li>
                        <span className="text-foreground font-medium">Brenners Armories</span> — added missing
                        attachments and suppressors, increased magazine and ammo counts for several weapons, new weapon
                        packs
                    </li>
                    <li>
                        <span className="text-foreground font-medium">Other</span> — engraved AK-47 in the Duga military
                        crates and Kar98k in the lockers, C4 Circuit Board and Packed C4 on suicide zombies, M82 in
                        Naval Base, AWM in Factory, removed flares from Naval Base and Factory lockers
                    </li>
                </ul>

                <h2 className="scroll-m-20 text-xl font-semibold tracking-tight mt-8 mb-3 border-b pb-2">
                    Installation
                </h2>
                <ol className="text-sm ml-6 list-decimal [&>li]:mt-1 text-muted-foreground">
                    <li>Download the pack below</li>
                    <li>Extract the ZIP archive</li>
                    <li>
                        Copy the{' '}
                        <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
                            Loot
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
                            href="https://github.com/v1ktor/scum-tools-custom-quests-and-loot/releases/download/v0.0.1/vanilla-plus-v0.0.1.zip"
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
