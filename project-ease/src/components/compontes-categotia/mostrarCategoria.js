import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import styles from '../layout/categoria.module.css';
import Modal from './EnviarSubcategoria';

function ListaCategoria({ id, categoria }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [subcategoria, setSubcategoria] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/subcategoria', {
            method: 'GET',
            headers: { "Content-type": 'application/json' },
        })
            .then((resp) => resp.json())
            .then((respJson) => setSubcategoria(respJson))
            .catch((erro) => console.log("Erro ao pegar suas subcategorias: " + erro));
    }, []);

    function openModal() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }

    return (
        <>
            <div id={styles.divCategoria}>
                <div className={styles.nomeCategoria}>
                    <p>Nome: {categoria}</p>
                    <div className={styles.botaoCategoria}>
                        <button className={styles.botaoExcluir}><FaTrash /> Excluir</button>
                        <button className={styles.botaoExcluir} onClick={openModal}>Adicionar Subcategoria</button>
                    </div>
                </div>
                <div className={styles.estiloSubcategorias}>
                    {subcategoria.map((subcat) => {
                        if (subcat.idCategoria === id) {
                            return (
                                <div className={styles.subcategoria}>
                                    <p>Subcategoria: {subcat.subcategoria}</p>
                                    <button>Excluir</button>
                                </div>
                            );
                        } else {
                            return null; 
                        }
                    })}
                </div>
                {isModalOpen && (
                    <Modal onClose={closeModal} id={id} />
                )}
            </div>
        </>
    );
}

export default ListaCategoria;
