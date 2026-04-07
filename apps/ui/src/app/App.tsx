import ReactGA from 'react-ga4';
import { Route, Routes } from 'react-router-dom';
import Layout from '@/app/layout.tsx';
import { ThemeProvider } from '@/components/theme-provider/theme-provider.tsx';
import { Toaster } from '@/components/ui/sonner.tsx';
import { NavigationPath } from '@/data/navigation-path.ts';
import { Changelog } from '@/pages/changelog/Changelog.tsx';
import { Home } from '@/pages/home/Home.tsx';
import { Spawners } from '@/pages/spawners/Spawners.tsx';

export function App() {
    ReactGA.initialize('G-81R7K0PWNF');

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path={NavigationPath.Changelog} element={<Changelog />} />
                    <Route path={NavigationPath.Spawners} element={<Spawners />} />
                </Routes>
            </Layout>
            <Toaster />
        </ThemeProvider>
    );
}
