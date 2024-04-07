import React from 'react';
import styles from './layout/MeusProjetos.module.css'
import {Link} from 'react-router-dom';


function ListaProjetos({id, nome, orcamento, categoria, handleRemove}){

    const remover = (e) => {
        e.preventDefault()
        handleRemove(id)
    }

    return(
        
            <div className ={styles.projeto}>
                <h1 className ={styles.nomeProjeto}><strong>{nome}</strong></h1>
                <p className ={styles.orçamento}><strong>Orçamento: </strong>R${orcamento}</p>
                <p className ={styles.categoria}><strong>Categoria: </strong>{categoria}</p>
                <Link to={`/projeto/${id}`}>
                    <button className ={styles.editar}>Ver/Editar</button>
                </Link>
                <button className ={styles.excluir} onClick={remover}>Excluir</button>
            </div>
   
    )
}

export default ListaProjetos