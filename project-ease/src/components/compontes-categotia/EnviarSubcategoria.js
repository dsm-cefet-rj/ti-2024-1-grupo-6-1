import React, { useState } from 'react';
import styles from '../layout/categoria.module.css';

function Modal({ onClose, id }) {
    const [subcategoria, setSubcategoria] = useState({});

    const handleCreateSubcategory = (event) => {
       // event.preventDefault();
        console.log('AQUII'+subcategoria)
        fetch(`http://localhost:5000/subcategoria`, {
            method: "POST",
            headers: { "Content-type": 'application/json' },
            body: JSON.stringify(subcategoria)
        })
        .then((resp) => resp.json())
        .then((respJson) => console.log(respJson))
        .catch((erro) => console.log("Erro ao inserir no banco de dados"));
    };
    
    const handleOnChange = (e) => {
        setSubcategoria({ ...subcategoria,idCategoria:id, [e.target.name]: e.target.value });
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
