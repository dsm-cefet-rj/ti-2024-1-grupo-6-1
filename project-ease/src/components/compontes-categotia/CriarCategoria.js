import React, { useState } from 'react';
import styles from '../layout/categoria.module.css'
import MostrarCategoriaNaDiv from './ListaCategoria'


function Categoria(props) {
    const [categoria, setCategoria] = useState({});

    const handleSubmit = (e) => {
        // e.preventDefault() // não atualiza a página
        fetch('http://localhost:5000/categorias', {
            //post - publica,    get - pega,    patch/put - atualiza
            method: "POST",
            headers: { "Content-type": 'application/json' },   // colocando um json
            body: JSON.stringify(categoria)   //transforma em uma string json
        }).then((resp) => {  // pega a resposta do banco de dados
            alert("enviado com sucesso")
            return resp.json()  //transforma a string em um objeto
        }).then((respJson) => console.log(respJson))  //imprime a resposta
            .catch((erro) => console.log("Erro ao inserir no banco de dados"))

    }
    function handleOnChange(e) {
        setCategoria({ ...categoria, [e.target.name]: e.target.value })
        console.log('categoria: ' + categoria.categoria)
        console.log('subcategoria: ' + categoria.subcategoria)
    }

    const estilo = {
        marginLeft: '30px'
    };

    return (
        <>
            <button id={styles.botaoMostrar}>Mostrar formulário de categorias</button>

            <main>
                <div id={styles.formulario}>
                    <div id={styles.idForm}>
                        <h3 style={estilo}>Insira a categoria</h3>
                        <p style={{ marginLeft: '30px' }} id={styles.criarCategoria}>Crie uma categoria de projeto</p>
                        <form id={styles.estilosForm} onSubmit={handleSubmit}>
                            <input className={styles.input} placeholder="Insira o nome da categoria" type="text" name="categoria" value={categoria.categoria} onChange={handleOnChange} id={styles.nome}></input>
                            <button id={styles.botaoForm} style={{ width: '320px', height: '40px' }}>Cadastrar categoria</button>
                        </form>
                    </div>
                </div>

            </main>
            <div id={styles.categoria}>
                <h3>Categorias:</h3>
                <MostrarCategoriaNaDiv />
            </div>
        </>
    );
}

export default Categoria
