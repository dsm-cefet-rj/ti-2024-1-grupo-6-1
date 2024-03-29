import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Projetos from './components/Projetos';
import Home from './components/Home';
import Navbar from './components/layout/Navbar';
import EditarProjeto from './components/EditarProjeto';

function App() {
  return (
    <h1>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projetos" element={<Projetos />} />
          <Route path="/editarProjeto" element={<EditarProjeto />} />
        </Routes>
    </Router>
    </h1>
  );
}

export default App;
