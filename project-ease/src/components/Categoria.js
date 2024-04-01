import React from 'react';
import styles from './layout/categoria.module.css'
import { FaTrash } from 'react-icons/fa'


function Categoria() {
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
                        <form id={styles.estilosForm}>
                            <input className={styles.input} placeholder="Insira o nome da categoria" type="text" name="nome" id={styles.nome}></input>
                            <input className={styles.input} placeholder="Insira uma subcategoria" type="text" name="subcategoria" id={styles.subcategoria}></input>
                            <button id={styles.botaoForm} style={{ width: '320px', height: '40px' }}>Cadastrar categoria</button>
                        </form>
                    </div>
                </div>
            </main>
            <div id={styles.categoria}>
                <h3>Categorias:</h3>
                <div id={styles.divCategoria}>
                    <p>Nome: Desenvolvimento</p>
                    <button id={styles.botaoExcluir}><FaTrash /> Excluir</button>
                </div>
            </div>
        </>
    );
}

export default Categoria
