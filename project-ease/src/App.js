import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Projetos from './components/Projetos';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/layout/Navbar';
import Projeto from './components/Projeto';
import CriarProjeto from './components/CriarProjeto';
import Categoria from './components/compontes-categotia/CriarCategoria';
import Cadastrar from './components/cadastrarUsuario';
import Footer from './components/layout/Footer';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/projetos" element={<Projetos />} />
          <Route path="/projeto/:id" element={<Projeto />} />
          <Route path="/criarProjeto" element={<CriarProjeto />} />
          <Route path="/categoria" element={<Categoria />} />
          <Route path="/cadastrar" element={<Cadastrar />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
