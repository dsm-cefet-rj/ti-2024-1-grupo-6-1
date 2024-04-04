import React from 'react';
import { useState } from 'react';
import styles from './layout/CriarProjeto.module.css'

function CriarProjeto(){

    const [projeto, setProjeto] = useState({})

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

    function handleOnChange(e){
        setProjeto({...projeto, [e.target.name]: e.target.value}) //projeto.nome, projeto.orcamento, projeto.categoria
        console.log('projeto: ' + projeto.nome)
        console.log('orcamento: ' + projeto.orcamento)
        console.log('categoria: ' + projeto.categoria)
        console.log('subcategoria: ' + projeto.subcategoria)
    }

    return(
        <div className={styles.estilo}>
            <h1 className={styles.titulo}> Crie o seu projeto</h1>
            <p className={styles.subtitulo}> Após clicar em confirmar vá para a aba "projetos"</p>
            <form className={styles.estiloForm}onSubmit={novoProjeto}>
                <label className={styles.texto}>Nome: </label>
                <input className={styles.input} type='text' placeholder='Digite o nome' name='nome' onChange={handleOnChange}></input><br></br>
                <label className={styles.texto}>Orçamento: </label>
                <input className={styles.input} type='number' placeholder='Digite o orçamento' name='orcamento' onChange={handleOnChange}></input><br></br>
                <label className={styles.texto}>Categoria: </label>
                <input className={styles.input} type='text' placeholder='Selecione a categoria' name='categoria' onChange={handleOnChange}></input><br></br>
                <label className={styles.texto}> Subcategoria: </label>
                <input className={styles.input} type='text' placeholder='Selecione a subcategoria' name='subcategoria' onChange={handleOnChange}></input><br></br>
                <button className={styles.botao}>Confirmar</button>

            </form>
        </div>
    )
}

export default CriarProjeto