import React from 'react';
import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Conteiner from './layout/Conteiner'
import styles from './layout/Projeto.module.css'
import FormProjeto from './FormProjeto'
import FormServico from './FormServico';
import ListaServico from './ListaServico'
import Mensagem from './layout/Mensagem';
import {parse, v4 as uuidv4} from 'uuid'

function Projeto(){

    const {id} = useParams()
    const[projeto, setProjeto] = useState({})
    const[servicos, setServicos] = useState({})
    const[formularioProjeto, setFormularioProjeto] = useState(false)
    const[formularioServico, setFormularioServico] = useState(false)
    const[mensagem, setMensagem] = useState()
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
            setServicos(data.servicos)
            console.log(data)
        })
        .catch((erro) => console.log(erro))
    },[id])


    function editPost(projeto){
        setMensagem('')

        if(projeto.orcamento < projeto.custo){
            setMensagem('O orçamento não pode ser menor que o custo do projeto!')
            setTipo('error')
            return false
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
            setMensagem('Projeto atualizado!')
            setTipo('sucesso')
        })
        .catch(err => console.log(err))
    }

    function criarServico() {

        //ultimo serviço
        const ultimoServico = projeto.servicos[projeto.servicos.length - 1]
        ultimoServico.id = uuidv4()
        const ultimoServicoCusto = ultimoServico.custo
        const novoCusto = parseFloat(projeto.custo) + parseFloat(ultimoServicoCusto)

        //validação de valor máximo
        if(novoCusto > parseFloat(projeto.orcamento)) {
            setMensagem('Orçamento ultrapassado, verifique o valor do serviço')
            setTipo('error')
            projeto.servicos.pop()
            return false
        }

        //adiciona o custo do serviço ao total do projeto
        projeto.custo = novoCusto

        //atualiza o projeto
        fetch(`http://localhost:5000/projetos/${projeto.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projeto)
        })
        .then((resp) => resp.json())
        .then((data) => {
            setServicos(data.servicos)
            setFormularioServico(false)
        })
        .catch((erro) => console.log(erro))
    }

    function removerServico() {

    }


    function ativarFormularioProjeto(){
        setFormularioProjeto(!formularioProjeto)
    }

    function ativarFormularioServico(){
        setFormularioServico(!formularioServico)
    }
    
    console.log(projeto)

    return (
        <>{projeto && (<div className={styles.detalhesProjeto}>
            <Conteiner customClass="column">
                <div className={styles.detalhesConteiner}>
                    {mensagem && <Mensagem tipo={tipo} msg={mensagem}/>}
                    <h1>Projeto: {projeto.nome}</h1>
                    <button onClick={ativarFormularioProjeto} className={styles.botao}>
                        {!formularioProjeto ? 'Editar Projeto' : 'Fechar'}
                    </button>
                    {!formularioProjeto ? (
                        /* Causa um erro
                           <p>
                                <span>Categoria: </span> {projeto.categoria.categoria}
                            </p>
                            <p>
                                <span>Subcategoria: </span> {projeto.subcategoria}
                            </p>
                        */
                        <div className={styles.infoProjeto}>
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
                <div className={styles.detalhesConteiner}>
                    <h2>Adicione um serviço:</h2>
                    <button onClick={ativarFormularioServico} className={styles.botao}>
                        {!formularioServico ? 'Adicionar serviço' : 'Fechar'}
                    </button>
                    <div className={styles.infoProjeto}>
                        {formularioServico && (
                            <FormServico
                                handleSubmit={criarServico}
                                btnText='Adicionar serviço'
                                projectData={projeto}
                            />
                        )}
                    </div>
                </div>
                <h2>Serviços</h2>
                <Conteiner customClass='start'>
                    {servicos.length > 0 && 
                        servicos.map((servico) => (
                            <ListaServico 
                                id={servico.id}
                                nome={servico.nome}
                                custo={servico.custo}
                                descricao={servico.descricao}
                                key={servico.id}
                                handleRemove={removerServico}
                            />
                        ))
                    }
                    {servicos.length === 0 && <p>Não há serviços cadastrados.</p>}
                </Conteiner>
            </Conteiner>
        </div>)}
            
        </>
    )
}

export default Projeto