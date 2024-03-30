import { useEffect, useState } from 'react';
import styles from './layout/MeusProjetos.module.css'
import ListaProjetos from './ListaProjetos';
import {Link} from 'react-router-dom';

function Projetos(){

    const [projeto, setProjeto] = useState(null) //valor inicial

    //faz automaticamente quando abre a pagina
    useEffect(() => {    
        fetch('http://localhost:5000/projetos', {
            method: 'GET',
            headers: {"Content-type": 'application/json'},
        }).then((resp) => {
            return resp.json()
        }).then((respJson) => setProjeto(respJson))  // leva a resposta para o setProjeto para ter acesso aos dados
        .catch((erro) => console.log("Erro ao pegar seus projetos " + erro))
    }, []) 
    
    return( //retorna o html
        <div className ={styles.projetos}>
            <h1 className ={styles.meusProjetos}><strong>Meus Projetos</strong></h1>
            <Link to="/criarProjeto">
                <button className ={styles.criarProjeto}>Criar Projeto </button>
            </Link>
            <div className = {styles.verProjetos}>
            { //nesse retorno significa que esta mexendo com javascript {}

                projeto &&
                projeto.map((p) => (   //pega todo o projeto(p) que esta dentro dessa lista projeto
                <ListaProjetos key={p.id} nome={p.nome} orcamento={p.orcamento} categoria={p.categoria} />
                ))  
            }
            </div>
        </div>
    )
}

export default Projetos