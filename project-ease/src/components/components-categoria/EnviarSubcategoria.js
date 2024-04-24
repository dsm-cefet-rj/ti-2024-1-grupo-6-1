import React, { useState } from 'react';
import styles from '../layout/Categorias.module.css';

function Modal({ onClose, id }) {
    const [subcategoria, setSubcategoria] = useState({});

    const handleCreateSubcategory = (event) => {
        event.preventDefault();
        const novaSubcategoria = subcategoria.subcategoria.trim();
        fetch(`http://localhost:5000/subcategoria`, {
            method: "GET",
            headers: { "Content-type": "application/json" }
        })
            .then((resp) => resp.json())
            .then(() => {
            .then((subcategoriasExistentes) => {
                
                    fetch('http://localhost:5000/subcategoria', {
                        method: "POST",
                        headers: { "Content-type": 'application/json' },
                        body: JSON.stringify({ subcategoria: novaSubcategoria, idCategoria: id })
                    })
                        .then((resp) => {
                            if (resp.ok) {
                                alert("Subcategoria inserida com sucesso!");
                                setSubcategoria({ ...subcategoria, subcategoria: "" });
                                window.location.href = '/categoria';
                            } else {
                                alert("Erro ao inserir subcategoria.");
                            }
                        })
                        .catch((erro) => console.log("Erro ao inserir no banco de dados", erro));
                }
          )
                
            })
            .catch((erro) => console.log("Erro ao verificar subcategorias no banco de dados", erro));
    };


    const handleOnChange = (e) => {
        setSubcategoria({ ...subcategoria, idCategoria: id, [e.target.name]: e.target.value });
    };


    return (
        <div className={styles.modalContainer}>
            <div className={styles.modal}>
                <div>
                    <form id={styles.estilosForm} onSubmit={handleCreateSubcategory}>
                        <label htmlFor="subcategoria">Insira o nome da subcategoria</label>
                        <input onChange={handleOnChange} className={styles.input} placeholder="Insira o nome da subcategoria" type="text" name="subcategoria" id="subcategoria" />
                        <button style={{ width: '320px', height: '40px' }} className={styles.botaoForm} >Cadastrar subcategoria</button>
                    </form>
                    <button style={{ width: '320px', height: '40px' }} className={styles.botaoForm} onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
