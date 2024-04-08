import React from 'react';
import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Conteiner from './layout/Conteiner'
import styles from './layout/Projeto.module.css'
import FormProjeto from './FormProjeto'

function Projeto(){

    const {id} = useParams()
    const[projeto, setProjeto] = useState(null)
    const[formularioProjeto, setFormularioProjeto] = useState(false)
    const[message, setMessage] = useState()
    const[tipo, setTipo] = useState()

    useEffect(() => {
        fetch(`http://localhost:5000/projetos/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProjeto(data)
            console.log(data)
        })
        .catch((erro) => console.log(erro))
    },[id])


    function editPost(projeto){
        if(projeto.orcamento < projeto.custo){

        }
        
        fetch(`http://localhost:5000/projetos/${projeto.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projeto),
        })
        .then(resp => resp.json())
        .then((data) => {
            setProjeto(data)
            setFormularioProjeto(false)
        })
        .catch(err => console.log(err))
    }

    function ativarFormularioProjeto(){
        setFormularioProjeto(!formularioProjeto)
    }
    
    console.log(projeto)

    return (
        <>{projeto && (<div className={styles.detalhesProjeto}>
            <Conteiner customClass="column">
                <div className={styles.detalhesConteiner}>
                    <h1>Projeto: {projeto.nome}</h1>
                    <button onClick={ativarFormularioProjeto} className={styles.botao}>
                        {!formularioProjeto ? 'Editar Projeto' : 'Fechar'}
                    </button>
                    {!formularioProjeto ? (
                        <div className={styles.infoProjeto}>
                            <p>
                                <span>Categoria: </span> {projeto.categoria.categoria}
                            </p>
                            <p>
                                <span>Subcategoria: </span> {projeto.subcategoria}
                            </p>
                            <p>
                                <span>Orçamento Total:</span> R${projeto.orcamento}
                            </p>
                            <p> 
                                <span>Orçamento Utilizado:</span> R${projeto.custo} 
                            </p> 
                        </div> //custo é o orçamento total dos serviços
                    ) : (
                        <div className={styles.infoProjeto}>
                            <FormProjeto 
                                handleSubmit={editPost}
                                btnText="Concluir Edição" 
                                projectData={projeto}>
                            </FormProjeto>
                        </div>
                    )}
                </div>
            </Conteiner>
        </div>)}
            
        </>
    )
}

export default Projeto