import { Route, Routes } from "react-router-dom";
import { NavigationPath } from "./data/navigationPath.ts";
import { Changelog } from "./pages/changelog/Changelog.tsx";
import { Home } from "./pages/home/Home.tsx";
import { Spawners } from "./pages/spawners/Spawners.tsx";
import { Parameters } from "./pages/parameters/Parameters.tsx";
import { Nodes } from "./pages/nodes/Nodes.tsx";
import { Header } from "./components/header/Header.tsx";
import { Footer } from "./components/footer/Footer.tsx";

export function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path={NavigationPath.Spawners} element={<Spawners/>}/>
        <Route path={NavigationPath.Parameters} element={<Parameters/>}/>
        <Route path={NavigationPath.Nodes} element={<Nodes/>}/>
        <Route path={NavigationPath.Changelog} element={<Changelog/>}/>
      </Routes>
      <Footer/>
    </>
  )
}
