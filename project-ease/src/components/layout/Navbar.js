import React from 'react';
import { Link } from 'react-router-dom'; 
import styles from './Navbar.module.css';

function Navbar({isLoggedIn}) {
  
  return (
    <nav>
      <ul className={styles.lista}>
        <li className={styles.item}><Link to="/">Home</Link></li>
        <li className={styles.item}><Link to="/projetos">Projetos</Link></li>

        {isLoggedIn ? (
          <li className={styles.item}><Link to="/categoria">Categorias</Link></li>
        ) : (
          <li className={styles.botaoItem}><Link to="/login">Login</Link></li>
        )}
      {isLoggedIn && (
        <li className={styles.botaoItem}><Link to="/">Logout</Link></li>
      )}
      </ul>
    </nav>
  );
}

export default Navbar;
