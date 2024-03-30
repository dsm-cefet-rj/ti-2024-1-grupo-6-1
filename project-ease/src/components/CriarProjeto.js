import React from 'react';
import { useState } from 'react';

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
    }

    return(
        <form onSubmit={novoProjeto}>
            <label>Nome: </label>
            <input type='text' placeholder='nome' name='nome' onChange={handleOnChange}></input><br></br>
            <label>Orçamento: </label>
            <input type='number' placeholder='orçamento' name='orcamento' onChange={handleOnChange}></input><br></br>
            <label>Categoria: </label>
            <input type='text' placeholder='categoria' name='categoria' onChange={handleOnChange}></input><br></br>
            <button>Confirmar</button>
        </form>
    )
}

export default CriarProjeto