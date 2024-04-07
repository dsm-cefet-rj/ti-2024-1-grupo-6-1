import React from 'react';
import styles from '../layout/categoria.module.css';

function Modal({ onClose }) {
    function handleCreateSubcategory(event) {
    }

    return (
        <div className={styles.modalContainer}>
            <div className={styles.modal}>
                <div >
                    <form id={styles.estilosForm}>
                        <label for="subcategoria">Insira o nome da subcategoria</label>
                        <input className={styles.input} placeholder="Insira o nome da subcategoria" type="text" name="subcategoria" id="subcategoria" />
                        <button id="btnSubcategoria" style={{ width: '320px', height: '40px' }} onClick={handleCreateSubcategory}>Cadastrar subcategoria</button>
                    </form>
                    <button style={{ width: '320px', height: '40px' }} className="btnClose" onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
