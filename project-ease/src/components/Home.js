import React from 'react';
import styles from './layout/Home.module.css'
import fotoHome from './layout/icons/fotoHome.png'
import {Link} from 'react-router-dom';

function Home(){
    return(
        <main className={styles.conteudo}>
        <section className={styles.conteudoPrincipal}>
            <div className={styles.conteudoPrincipalEscrito}> 
                <h1 className={styles.conteudoPrincipalEscritoTitulo}>Comece seu projeto no Project Ease!</h1>
                <a1 className={styles.conteudoPrincipalEscritoSubtitulo}>Crie um projeto, selecione a categoria e adicione serviços para facilitar a organização.</a1>
                <Link to="/criarProjeto">
                    <button className={styles.conteudoPrincipalEscritoBotao}>Clique aqui</button>
                </Link>
            </div>
                <img className={styles.conteudoPrincipalImagem} src={fotoHome} alt="fotoHome"></img>
        </section>
    </main>
    )
}

export default Home