import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Projetos from './components/Projetos';
import Home from './components/Home';
import Navbar from './components/layout/Navbar';
import EditarProjeto from './components/EditarProjeto';
import CriarProjeto from './components/CriarProjeto';

function App() {
  return (
    <div>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projetos" element={<Projetos />} />
          <Route path="/editarProjeto" element={<EditarProjeto />} />
          <Route path="/criarProjeto" element={<CriarProjeto />} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;
