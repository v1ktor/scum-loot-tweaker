import './App.css'
import Header from "./components/header/Header.tsx";
import Footer from "./components/footer/Footer.tsx";

function App() {
  return (
    <>
      <Header/>
      <main className="flow content-grid">

        <h1 className='site-title'>Welcome to SCUM Loot Tweaker</h1>
        <p>Here will be probably some explanation on how to export .json files from the game and how to customize
          them</p>

      </main>
      <Footer/>
    </>
  )
}

export default App
