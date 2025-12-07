import ReactGA from 'react-ga4';
import Layout from '@/app/layout.tsx';
import {ThemeProvider} from '@/components/theme-provider/theme-provider.tsx';

export function App() {
  ReactGA.initialize('G-81R7K0PWNF');

  return (
    <ThemeProvider defaultTheme={'dark'} storageKey={'vite-ui-theme'}>
      <Layout>
        <></>
      </Layout>
    </ThemeProvider>
  )
}
