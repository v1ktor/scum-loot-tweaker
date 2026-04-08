import { IconRocket } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge.tsx';
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { NavigationPath } from '@/data/navigation-path.ts';

export function Home() {
    return (
        <div className="px-4 lg:px-6 w-full max-w-6xl mx-auto">
            <h1 className="text-4xl font-extrabold tracking-tight text-balance mb-2">Loot Tweaker</h1>
            <div className="grid grid-cols-2 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                <Link to={NavigationPath.Spawners} className="group h-full">
                    <Card className="@container/card card-gradient shadow-xs transition-colors group-hover:border-primary/30 dark:bg-card h-full">
                        <CardHeader>
                            <CardTitle className="text-2xl font-semibold @[250px]/card:text-3xl">Spawners</CardTitle>
                            <CardDescription>
                                Explore and modify vanilla spawner presets that define what loot players find when
                                searching objects in the world.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
                <Card className="@container/card card-gradient shadow-xs dark:bg-card">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-2xl font-semibold @[250px]/card:text-3xl">
                            Nodes
                        </CardTitle>
                        <CardDescription>
                            Explore vanilla loot templates and create custom ones to fine-tune what spawns in your
                            world.
                        </CardDescription>
                        <CardAction>
                            <Badge variant="outline">
                                <IconRocket />
                                Coming soon!
                            </Badge>
                        </CardAction>
                    </CardHeader>
                </Card>
                <Card className="@container/card card-gradient shadow-xs dark:bg-card">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-2xl font-semibold @[250px]/card:text-3xl">
                            Parameters
                        </CardTitle>
                        <CardDescription>
                            View and adjust item spawn parameters — control which items can spawn, where they appear,
                            cooldowns, and usage settings.
                        </CardDescription>
                        <CardAction>
                            <Badge variant="outline">
                                <IconRocket />
                                Coming soon!
                            </Badge>
                        </CardAction>
                    </CardHeader>
                </Card>
                <Card className="@container/card card-gradient shadow-xs dark:bg-card">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-2xl font-semibold @[250px]/card:text-3xl">
                            Cooldown Groups
                        </CardTitle>
                        <CardDescription>
                            Manage cooldown groups that limit rare loot in high-traffic areas, encouraging exploration
                            across the map.
                        </CardDescription>
                        <CardAction>
                            <Badge variant="outline">
                                <IconRocket />
                                Coming soon!
                            </Badge>
                        </CardAction>
                    </CardHeader>
                </Card>
                <Card className="@container/card card-gradient shadow-xs dark:bg-card">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-2xl font-semibold @[250px]/card:text-3xl">
                            Documentation
                        </CardTitle>
                        <CardDescription>
                            Learn how the SCUM loot system works and how to customize spawners, nodes, parameters, and
                            cooldown groups.
                        </CardDescription>
                        <CardAction>
                            <Badge variant="outline">
                                <IconRocket />
                                Coming soon!
                            </Badge>
                        </CardAction>
                    </CardHeader>
                </Card>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-balance mb-2 mt-8">Quests</h1>
            <div className="grid grid-cols-2 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                <Card className="@container/card card-gradient shadow-xs dark:bg-card">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-2xl font-semibold @[250px]/card:text-3xl">
                            Quest Editor
                        </CardTitle>
                        <CardDescription>
                            Simplify custom quest creation — visually design, tweak, and export quests for your server
                            or sandbox.
                        </CardDescription>
                        <CardAction>
                            <Badge variant="outline">
                                <IconRocket />
                                Coming soon!
                            </Badge>
                        </CardAction>
                    </CardHeader>
                </Card>
                <Card className="@container/card card-gradient shadow-xs dark:bg-card">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-2xl font-semibold @[250px]/card:text-3xl">
                            Vanilla Quests
                        </CardTitle>
                        <CardDescription>
                            Explore and edit vanilla quests — preview the default quest configurations and tailor them
                            to your server.
                        </CardDescription>
                        <CardAction>
                            <Badge variant="outline">
                                <IconRocket />
                                Coming soon!
                            </Badge>
                        </CardAction>
                    </CardHeader>
                </Card>
                <Card className="@container/card card-gradient shadow-xs dark:bg-card">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-2xl font-semibold @[250px]/card:text-3xl">
                            Documentation
                        </CardTitle>
                        <CardDescription>
                            Learn how to create, customize, and manage quests — from blocking defaults to adding rewards
                            like currency, fame, and skill experience.
                        </CardDescription>
                        <CardAction>
                            <Badge variant="outline">
                                <IconRocket />
                                Coming soon!
                            </Badge>
                        </CardAction>
                    </CardHeader>
                </Card>
            </div>
        </div>
    );
}
