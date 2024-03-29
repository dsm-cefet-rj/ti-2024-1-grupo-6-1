import {Link} from 'react-router-dom'
import styles from './Navbar.module.css'

function Navbar(){
    return (
        <ul className ={styles.lista}>
          <li className ={styles.item}><Link to="/">Home</Link></li>
          <li className ={styles.item}><Link to="/projetos">Projetos</Link></li>
        </ul>
    )
}

export default Navbar