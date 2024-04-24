import React, { useState } from 'react';
import styles from '../layout/Categorias.module.css'
import MostrarCategoriaNaDiv from './MostrarCategoriaDiv'


function Categoria() {
    const [categorias, setCategoria] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault(); 
        fetch(`http://localhost:5000/categorias`, {
            method: "GET",
            headers: { "Content-type": "application/json" }
        })
            .then((resp) => resp.json())
            .then((categoriasExistentes) => {
                const nomesCategoriasExistentes = categoriasExistentes.map(cat => cat.categoria);
                if (nomesCategoriasExistentes.includes(categorias.categoria.trim())) {
                    alert("Esta categoria já existe.");
                } else {
                    fetch('http://localhost:5000/categorias', {
                        method: "POST",
                        headers: { "Content-type": 'application/json' },
                        body: JSON.stringify({ categoria: categorias.categoria.trim() })
                    })
                        .then((resp) => {
                            if (resp.ok) {
                                alert("Categoria inserida com sucesso!");
                                setCategoria({ categoria: "" });
                            } else {
                                alert("Erro ao inserir categoria.");
                            }
                        })
                        .catch((erro) => console.log("Erro ao inserir no banco de dados"));
                }
            })
            .catch((erro) => console.log("Erro ao verificar categorias no banco de dados"));
    }



    function handleOnChange(e) {
        setCategoria({ ...categorias, [e.target.name]: e.target.value })
    }

    const estilo = {
        marginLeft: '30px'
    };

    return (
        <>
            <main>
                <div id={styles.formulario}>
                    <div id={styles.idForm}>
                        <h3 style={estilo}>Insira a categoria</h3>
                        <p style={{ marginLeft: '30px' }} id={styles.criarCategoria}>Crie uma categoria de projeto</p>
                        <form id={styles.estilosForm} onSubmit={handleSubmit}>
                            <input className={styles.input} placeholder="Insira o nome da categoria" type="text" name="categoria" value={categorias.categoria} onChange={handleOnChange} id={styles.nome}></input>
                            <button className={styles.botaoForm} style={{ width: '320px', height: '40px' }}>Cadastrar categoria</button>
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
