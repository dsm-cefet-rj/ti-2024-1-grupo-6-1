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
        setMensagem('')

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

    function removerServico(id, custo) {
       setMensagem('') 
       
       const servicosAtualizado = projeto.servicos.filter(
        (servico) => servico.id != id
       )

       const projetoAtualizado =  projeto
       projetoAtualizado.servicos = servicosAtualizado
       projetoAtualizado.custo = parseFloat(projetoAtualizado.custo) - parseFloat(custo)

       fetch(`http://localhost:5000/projetos/${projetoAtualizado.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projetoAtualizado)
       })
       .then((resp) => resp.json())
       .then((data) => {
            setProjeto(projetoAtualizado)
            setServicos(servicosAtualizado)
            setMensagem('Serviço removido')
       })
       .catch(erro => console.log(erro))
    }

    function editarServico(novoServico) {
        setMensagem('');
    
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
            setMensagem('Orçamento ultrapassado, verifique o valor do serviço');
            setTipo('error');
            return false;
        }
    
        // Atualiza o custo total do projeto e os serviços
        projeto.custo = novoCustoTotal;
        projeto.servicos = servicosAtualizados;
    
        // Envia a solicitação PATCH para atualizar o projeto no servidor
        fetch(`http://localhost:5000/projetos/${projeto.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projeto)
        })
        .then(resp => resp.json())
        .then(data => {
            setProjeto(data);
            setServicos(servicosAtualizados);
            setFormularioServico(false);
            setMensagem('Serviço atualizado');
            setTipo('sucesso');
        })
        .catch(erro => console.log(erro));
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