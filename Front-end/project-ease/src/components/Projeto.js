import React from 'react';
import {useParams} from 'react-router-dom'
import {useState} from 'react'
import Conteiner from './layout/Conteiner'
import styles from './layout/Projeto.module.css'
import FormProjeto from './FormProjeto'
import FormServico from './FormServico';
import ListaServico from './ListaServico'
import Mensagem from './layout/Mensagem';
import {v4 as uuidv4} from 'uuid'

import { useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import rootReducer from './../redux/root-reducer';

function Projeto(){

    const {id} = useParams()
    const dispatch = useDispatch();
    const {projeto, mensagem, tipo, formularioProjeto, servicos, formularioServico} = useSelector(rootReducer=>rootReducer.projetoReducer)


    useEffect(() => {
        fetch(`http://localhost:3005/projetos/${id}`, {  // porta corrigida para 3005
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            dispatch({type: 'setProjeto', payload: data});
            dispatch({type: 'setServicos', payload: data.servicos});
        })
        .catch((erro) => console.log(erro))
    }, [id, dispatch]);


    function editPost(projeto) {
        dispatch({ type: 'setMensagem', payload: '' });
    
        if (projeto.orcamento < projeto.custo) {
            dispatch({ type: 'setMensagem', payload: 'O orçamento não pode ser menor que os custos do projeto!' });
            dispatch({ type: 'setTipo', payload: 'erro' });
            return false;
        }
    
        // Use o método PUT ou PATCH, dependendo de como seu back-end está configurado
        fetch(`http://localhost:3005/projetos/${projeto.id}`, {
            method: 'PUT', // ou 'PATCH', dependendo de sua implementação no back-end
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projeto), // Enviar o projeto atualizado no corpo da requisição
        })
        .then((resp) => resp.json())
        .then((data) => {
            dispatch({ type: 'setProjeto', payload: data });
            dispatch({ type: 'setFormularioProjeto' });
            dispatch({ type: 'setMensagem', payload: 'Projeto atualizado!' });
            dispatch({ type: 'setTipo', payload: 'sucesso' });
        })
        .catch((err) => console.log(err));
    }

    function criarServico() {
        dispatch({type: 'setMensagem', payload: ''})

        //ultimo serviço
        const ultimoServico = projeto.servicos[projeto.servicos.length - 1]
        ultimoServico.id = uuidv4()
        const ultimoServicoCusto = ultimoServico.custo
        const novoCusto = parseFloat(projeto.custo) + parseFloat(ultimoServicoCusto)

        //validação de valor máximo
        if(novoCusto > parseFloat(projeto.orcamento)) {
            dispatch({type: 'setMensagem', payload: 'Orçamento ultrapassado, verifique o valor do serviço'})
            dispatch({type: 'setTipo', payload: 'error'})
            projeto.servicos.pop()
            return false
        }

        //adiciona o custo do serviço ao total do projeto
        projeto.custo = novoCusto

        //atualiza o projeto
        fetch(`http://localhost:3005/projetos/${projeto.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projeto)
        })
        .then((resp) => resp.json())
        .then((data) => {
            dispatch({type: 'setServicos', payload: data.servicos})  //data.servicos
            dispatch({type: 'setFormularioServico'})
        })
        .catch((erro) => console.log(erro))
    }

    function removerServico(id, custo) {
        dispatch({type: 'setMensagem', payload: ''})
       
       const servicosAtualizado = projeto.servicos.filter(
        (servico) => servico.id != id
       )

       const projetoAtualizado =  projeto
       projetoAtualizado.servicos = servicosAtualizado
       projetoAtualizado.custo = parseFloat(projetoAtualizado.custo) - parseFloat(custo)

       fetch(`http://localhost:3005/projetos/${projetoAtualizado.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projetoAtualizado)
       })
       .then((resp) => resp.json())
       .then((data) => {
            dispatch({action: 'setProjeto', payload: projetoAtualizado})
            dispatch({type: 'setServicos', payload: data.servicosAtualizado})    //servicosAtualizado
            dispatch({type: 'setMensagem', payload: 'Serviço excluido'})
       })
       .catch(erro => console.log(erro))
    }

    function editarServico(novoServico) {
        dispatch({type: 'setMensagem', payload: ''})
    
        // Atualiza o serviço com os novos detalhes
        const servicosAtualizados = projeto.servicos.map(servico => {
            if (servico.id === novoServico.id) {
                return {
                    ...servico,
                    nome: novoServico.nome,
                    custo: novoServico.custo,
                    descricao: novoServico.descricao
                };
            }
            return servico;
        });
    
        // Calcula o novo custo total do projeto
        const novoCustoTotal = servicosAtualizados.reduce((total, servico) => total + parseFloat(servico.custo), 0);
    
        // Validação do orçamento
        if (novoCustoTotal > parseFloat(projeto.orcamento)) {
            dispatch({type: 'setMensagem', payload: 'Orçamento ultrapassado, verifique o valor do serviço'})
            dispatch({type: 'setTipo', payload: 'error'})
            return false;
        }
    
        // Atualiza o custo total do projeto e os serviços
        projeto.custo = novoCustoTotal;
        projeto.servicos = servicosAtualizados;
    
        // Envia a solicitação PATCH para atualizar o projeto no servidor
        fetch(`http://localhost:3005/projetos/${projeto.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projeto)
        })
        .then(resp => resp.json())
        .then(data => {
            dispatch({action: 'setProjeto', payload: data})
            dispatch({type: 'setServicos', payload: data.servicos})    //servicosAtualizado
            dispatch({type: 'setFormularioServico'})
            dispatch({type: 'setMensagem', payload: 'Serviço atualizado'})
            dispatch({type: 'setTipo', payload: 'sucesso'})
        })
        .catch(erro => console.log(erro));
    }


    function ativarFormularioProjeto(){
        dispatch({type: 'setFormularioProjeto'})
    }

    function ativarFormularioServico(){
        dispatch({type: 'setFormularioServico'})
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
                        <div className={styles.infoProjeto}>
                            {projeto.categoria && (
                                <p>
                                    <span>Categoria: </span> {projeto.categoria.categoria}
                                </p>
                            )}
                            {projeto.subcategoria && (
                                <p>
                                    <span>Subcategoria: </span> {projeto.subcategoria.subcategoria}
                                </p>
                            )}
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
                                handleEdit={editarServico}
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