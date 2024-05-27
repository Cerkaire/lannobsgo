import Home from './pages/Home';
import Navbar from './components/Navbar';
import SignUpModal from './components/SignUpModal';
import SignInModal from './components/SignInModal';
import { Routes, Route } from "react-router-dom";
import Parametre from './components/Parametre';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/parametre" element={<Parametre />} />
      </Routes>
    </>
  );
}

export default App;
