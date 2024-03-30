import React from 'react';
import styles from './layout/MeusProjetos.module.css'
import {Link} from 'react-router-dom';


function ListaProjetos({nome, orcamento, categoria}){
    return(
        
            <div className ={styles.projeto}>
                <h1 className ={styles.nomeProjeto}><strong>{nome}</strong></h1>
                <p className ={styles.orçamento}><strong>Orçamento: </strong>R${orcamento}</p>
                <p className ={styles.categoria}><strong>Categoria: </strong>{categoria}</p>
                <Link to="/editarProjeto">
                    <button className ={styles.editar}>Editar</button>
                </Link>
                <button className ={styles.excluir}>Excluir</button>


            </div>
   
    )
}

export default ListaProjetos