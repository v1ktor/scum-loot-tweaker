import ReactGA from 'react-ga4';
import { Route, Routes } from 'react-router-dom';
import Layout from '@/app/layout.tsx';
import { ThemeProvider } from '@/components/theme-provider/theme-provider.tsx';
import { Toaster } from '@/components/ui/sonner.tsx';
import { NavigationPath } from '@/data/navigation-path.ts';
import { Changelog } from '@/pages/changelog/changelog.tsx';
import { CustomQuests } from '@/pages/custom-quests/custom-quests.tsx';
import { CustomSpawners } from '@/pages/custom-spawners/custom-spawners.tsx';
import { Home } from '@/pages/home/home.tsx';
import { Nodes } from '@/pages/nodes/nodes.tsx';
import { QuestDetail } from '@/pages/quests/quest-detail.tsx';
import { Quests } from '@/pages/quests/quests.tsx';
import { Spawners } from '@/pages/spawners/spawners.tsx';

export function App() {
    ReactGA.initialize('G-81R7K0PWNF');

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path={NavigationPath.Changelog} element={<Changelog />} />
                    <Route path={NavigationPath.Spawners} element={<Spawners />} />
                    <Route path={NavigationPath.Nodes} element={<Nodes />} />
                    <Route path={NavigationPath.CustomSpawners} element={<CustomSpawners />} />
                    <Route path={NavigationPath.CustomQuests} element={<CustomQuests />} />
                    <Route path={NavigationPath.Quests} element={<Quests />} />
                    <Route path={`${NavigationPath.Quests}/:giverId/:questId`} element={<QuestDetail />} />
                </Routes>
            </Layout>
            <Toaster />
        </ThemeProvider>
    );
}
