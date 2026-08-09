import {Route, Routes, useLocation} from 'react-router-dom';
import Layout from '@/app/layout.tsx';
import {ErrorBoundary} from '@/components/error-boundary/error-boundary.tsx';
import {ThemeProvider} from '@/components/theme-provider/theme-provider.tsx';
import {Toaster} from '@/components/ui/sonner.tsx';
import {NavigationPath} from '@/data/navigation-path.ts';
import {Changelog} from '@/pages/changelog/changelog.tsx';
import {CooldownGroups} from '@/pages/cooldown-groups/cooldown-groups.tsx';
import {CustomQuests} from '@/pages/custom-quests/custom-quests.tsx';
import {CustomSpawners} from '@/pages/custom-spawners/custom-spawners.tsx';
import {Home} from '@/pages/home/home.tsx';
import {MyQuests} from '@/pages/my-quests/my-quests.tsx';
import {MySpawners} from '@/pages/my-spawners/my-spawners.tsx';
import {Nodes} from '@/pages/nodes/nodes.tsx';
import {Parameters} from '@/pages/parameters/parameters.tsx';
import {QuestDetail} from '@/pages/quests/quest-detail.tsx';
import {QuestEditorPage} from '@/pages/quests/quest-editor-page.tsx';
import {Quests} from '@/pages/quests/quests.tsx';
import {Spawners} from '@/pages/spawners/spawners.tsx';

export function App() {
  const {pathname} = useLocation();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout>
        <ErrorBoundary resetKey={pathname}>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path={NavigationPath.Changelog} element={<Changelog/>}/>
            <Route path={NavigationPath.Spawners} element={<Spawners/>}/>
            <Route path={NavigationPath.MySpawners} element={<MySpawners/>}/>
            <Route path={NavigationPath.Nodes} element={<Nodes/>}/>
            <Route path={NavigationPath.Parameters} element={<Parameters/>}/>
            <Route path={NavigationPath.CooldownGroups} element={<CooldownGroups/>}/>
            <Route path={NavigationPath.CustomSpawners} element={<CustomSpawners/>}/>
            <Route path={NavigationPath.CustomQuests} element={<CustomQuests/>}/>
            <Route path={NavigationPath.MyQuests} element={<MyQuests/>}/>
            <Route path={NavigationPath.QuestEditor} element={<QuestEditorPage/>}/>
            <Route path={NavigationPath.Quests} element={<Quests/>}/>
            <Route path={`${NavigationPath.Quests}/:giverId/:questId`} element={<QuestDetail/>}/>
          </Routes>
        </ErrorBoundary>
      </Layout>
      <Toaster/>
    </ThemeProvider>
  );
}
