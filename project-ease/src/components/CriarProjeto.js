import React from 'react';
import { useState, useEffect } from 'react';
import styles from './layout/CriarProjeto.module.css'
import Input from './form/Input';
import Select from './form/Select';
import SubmitButton from './form/SubmitButton';

function CriarProjeto(){

    const [projeto, setProjeto] = useState({})
    const [categories, setCategories] = useState([]);

    const novoProjeto = (e)=>{
        e.preventDefault() // não atualiza a página
        fetch('http://localhost:5000/projetos', {
            //post - publica,    get - pega,    patch/put - atualiza
            method: "POST",
            headers: {"Content-type": 'application/json'},   // colocando um json
            body: JSON.stringify(projeto)   //transforma em uma string json
        }).then((resp) => {  // pega a resposta do banco de dados
            return resp.json()  //transforma a string em um objeto
        }).then((respJson) => console.log(respJson))  //imprime a resposta
        .catch((erro) => console.log("Erro ao inserir no banco de dados"))
        
    }

    const bdTemporario = "http://localhost:5000/categorias"

    useEffect(
        () => {
            fetch(bdTemporario,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((categorias) => {
                return categorias.json()
            })
            .then((categoriasJson) => {
                setCategories(categoriasJson)
            })
            .catch(err=>console.log("Deu erro: " + err))
        }, [])

    function handleOnChange(e){
        setProjeto({...projeto, [e.target.name]: e.target.value}) //projeto.nome, projeto.orcamento, projeto.categoria
        console.log('projeto: ' + projeto.nome)
        console.log('orcamento: ' + projeto.orcamento)
        console.log('categoria: ' + projeto.categoria)
        console.log('subcategoria: ' + projeto.subcategoria)
    }

    function handleSelect(e){
        setProjeto({...projeto, categoria: {
            id: e.target.value,
            categoria: e.target.options[e.target.selectedIndex].text
        }})
        
    }

    return(
        <div className={styles.estilo}>
            <h1 className={styles.titulo}> Crie o seu projeto</h1>
            <p className={styles.subtitulo}> Após clicar em confirmar vá para a aba "projetos"</p>
            <form className={styles.estiloForm}onSubmit={novoProjeto}>
            <Input 
                type="text"
                text="Nome do projeto"
                name="nome"
                placeholder={projeto.nome}
                handleOnChange={handleOnChange}
                value={projeto.nome ? projeto.nome: ''}
            />
            <Input 
                type="number"
                text="Orçamento do projeto"
                name="orcamento"
                placeholder={projeto.orcamento}
                handleOnChange={handleOnChange}
                value={projeto.orcamento ? projeto.orcamento : ''}
            />
            
            <Select
                name="category_ig"
                text={"Selecione a categoria"}
                option={categories}
                handleOnChange={handleSelect}
                value={projeto.categoria ? projeto.categoria.id : ''}
                />
            
            <SubmitButton text={'Criar Projeto'} />

            </form>
        </div>
    )
}

export default CriarProjeto