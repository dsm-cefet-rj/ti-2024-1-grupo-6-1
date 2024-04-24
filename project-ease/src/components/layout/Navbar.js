import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar({ isLoggedIn, setIsLoggedIn }) {

  function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  }

  return (
    <nav>
      <ul className={styles.lista}>
        <li className={styles.item}><Link to="/">Home</Link></li>
        <li className={styles.item}><Link to="/projetos">Projetos</Link></li>

        {isLoggedIn ? (
          <>
            <li className={styles.item}><Link to="/categoria">Categorias</Link></li>
            <li className={styles.botaoItem} onClick={handleLogout}><Link to="/">Logout</Link></li>

            <li className={styles.botaoItemCad} ><Link to="/cadastrar">Cadastrar adm</Link></li>
          </>
        ) : (
          <li className={styles.botaoItem}><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
