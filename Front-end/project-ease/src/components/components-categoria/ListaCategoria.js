import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { FaPlus, FaPen } from 'react-icons/fa';
import styles from '../layout/Categorias.module.css';
import Modal from './EnviarSubcategoria';
import { Link } from 'react-router-dom';

function ListaCategoria({id, categoria, handleRemove }) {
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

    const remover = () => {
        handleRemove(id)
    }

    function handleRemoveSubcategoria(id) {
        fetch(`http://localhost:5000/subcategoria/${id}`, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
        }).then((resp) => {
            return resp.json()
        }).then(() => {
            setSubcategoria(subcategoria.filter(subcategoria => subcategoria.id !== id));
        })
            .catch((err) => console.log("Erro ao tentar remover projeto: " + err))
    }

    function openModal() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }

    return (
        <>
            <div key={id} id={styles.divCategoria}>
                <div className={styles.nomeCategoria}>
                    <p className={styles.paragrafo}> Nome: {categoria}</p>
                    <div className={styles.botaoCategoria}>
                        <Link to={`/editarCategoria/${id}`}>
                            <button className={styles.botaoExcluir} ><FaPen /></button>
                        </Link>
                        <button className={styles.botaoExcluir} onClick={remover}><FaTrash /></button>
                        <button className={styles.botaoExcluir} onClick={openModal}><FaPlus /></button>
                    </div>
                </div>
                <div className={styles.estiloSubcategorias}>
                    {subcategoria.map((subcat) => {
                        if (subcat.idCategoria === id) {
                            return (
                                <div key={subcat.id} className={styles.subcategoria} id='formSubCat'>
                                    <p id='subcategoriaPar'>Subcategoria: {subcat.subcategoria}</p>
                                    <Link to={`/EditarSubcategoria/${subcat.id}`}>
                                        <button id='botaoSub' className={styles.botaoExcluir}><FaPen /></button>
                                    </Link>
                                    <button className={styles.botaoExcluir} onClick={() => handleRemoveSubcategoria(subcat.id)}><FaTrash /></button>
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
