import Header from "./components/header/Header.tsx";
import Footer from "./components/footer/Footer.tsx";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home.tsx";
import Spawners from "./pages/spawners/Spawners.tsx";
import Parameters from "./pages/parameters/Parameters.tsx";
import Nodes from "./pages/nodes/Nodes.tsx";
import Changelog from "./pages/changelog/Changelog.tsx";

function App() {
  return (
    <>
      <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/spawners" element={<Spawners />} />
          <Route path="/parameters" element={<Parameters />} />
          <Route path="/nodes" element={<Nodes />} />
          <Route path="/changelog" element={<Changelog />} />
        </Routes>
      <Footer/>
    </>
  )
}

export default App
