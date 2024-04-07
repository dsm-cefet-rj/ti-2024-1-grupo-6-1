import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import styles from '../layout/categoria.module.css';
import Modal from './ModalSubcategoria';

function ListaCategoria({ categoria, subcategoria }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    function openModal() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }

    return (
        <>
            <div id={styles.divCategoria}>
                <p>Nome: {categoria}</p>
                <div className={styles.botaoCategoria}>
                    <button className={styles.botaoExcluir}><FaTrash /> Excluir</button>
                    <button className={styles.botaoExcluir} onClick={openModal}>Adicionar Subcategoria</button>
                </div>
            </div>
            {isModalOpen && (
                <Modal onClose={closeModal} />
            )}
        </>
    );
}

export default ListaCategoria;
