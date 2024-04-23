import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Projetos from './components/Projetos';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/layout/Navbar';
import Projeto from './components/Projeto';
import CriarProjeto from './components/CriarProjeto';
import Categoria from './components/compontes-categotia/CriarCategoria';
import Editar from './components/compontes-categotia/EditarCategoria';
import Cadastrar from './components/CadastrarUsuario';
import ResetSenha from './components/ResetarSenha';
import Footer from './components/layout/Footer';
import EditarSubcategoria from './components/compontes-categotia/EditarSubcategoria';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/resetar-senha" element={<ResetSenha />} />
          <Route path="/projetos" element={<Projetos />} />
          <Route path="/projeto/:id" element={<Projeto />} />
          <Route path="/criarProjeto" element={<CriarProjeto />} />
          <Route path="/categoria" element={<Categoria />} />
          <Route path={`/editarCategoria/:id`} element={<Editar />} />
          <Route path={`/EditarSubcategoria/:id`} element={<EditarSubcategoria />} />
          <Route path="/cadastrar" element={<Cadastrar />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
