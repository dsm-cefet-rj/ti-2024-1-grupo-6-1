import React from 'react';
import styles from './layout/MeusProjetos.module.css'
import ListaProjetos from './ListaProjetos';

function Projetos(){
    return(
        <div className ={styles.projetos}>
            <h className ={styles.meusProjetos}><strong>Meus Projetos</strong></h>
            <button className ={styles.criarProjeto}>Criar Projeto </button>
            <div className ={styles.verProjetos}>
                <ListaProjetos></ListaProjetos>
                <ListaProjetos></ListaProjetos>
                <ListaProjetos></ListaProjetos>
                <ListaProjetos></ListaProjetos>
                <ListaProjetos></ListaProjetos>
                <ListaProjetos></ListaProjetos>
            </div>

        </div>
    )
}

export default Projetos