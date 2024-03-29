import React from 'react';
import styles from './layout/MeusProjetos.module.css'
import {Link} from 'react-router-dom';


function ListaProjetos(){
    return(
        
            <form className ={styles.projeto}>
                <h1 className ={styles.nomeProjeto}><strong>Teste123</strong></h1>
                <p className ={styles.orçamento}><strong>Orçamento: </strong>R$20000</p>
                <p1 className ={styles.categoria}><strong>Categoria: </strong>Infraestrutura</p1>
                <Link to="/editarProjeto">
                    <button className ={styles.editar}>Editar</button>
                </Link>
                <button className ={styles.excluir}>Excluir</button>


            </form>
   
    )
}

export default ListaProjetos