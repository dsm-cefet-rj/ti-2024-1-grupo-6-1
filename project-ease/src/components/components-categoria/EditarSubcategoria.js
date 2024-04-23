import React, { useState, useEffect } from 'react';
import styles from '../layout/Categoria.module.css';
import { useParams } from 'react-router-dom';

function EditarSubcategoria() {
    const { id } = useParams();
    const [subcategoria, setSubcategoria] = useState('');

    const [subcategoriaOriginal, setSubcategoriaOriginal] = useState('');


    useEffect(() => {
        fetch(`http://localhost:5000/subcategoria/${id}`, {
            method: 'GET',
            headers: { "Content-type": 'application/json' },
        }).then((resp) => {
            return resp.json()
        }).then((respJson) => setSubcategoriaOriginal(respJson))  // leva a resposta para o setProjeto para ter acesso aos dados
            .catch((erro) => console.log("Erro ao pegar seus projetos " + erro))
    }, [subcategoriaOriginal])

    function editarSubcat(event) {
        event.preventDefault();

        if (!subcategoria.trim()) {
            alert("Por favor, insira um nome para a categoria.");
            return;
        }

        fetch(`http://localhost:5000/subcategoria/${id}`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ subcategoria: subcategoria })
        }).then((resp) => {
            if (resp.ok) {
                alert("Subcategoria atualizada com sucesso!");
                window.location.href = '/categoria';
            } else {
                alert("Erro ao atualizar subcategoria");
            }
        }).catch((err) => console.log("Erro ao tentar atualizar categoria: " + err))
    }

    const handleOnChange = (e) => {
        setSubcategoria(e.target.value);
    };

    const handleVoltar = () => {
        window.location.href = '/categoria';
    }

    return (
        <div className={styles.modalContainer}>
            <div className={styles.modal}>
                <div>
                    <form id={styles.estilosForm} onSubmit={editarSubcat}>
                        <label htmlFor="subcategoria">Editar subcategoria {subcategoriaOriginal.subcategoria && subcategoriaOriginal.subcategoria.toUpperCase()}</label>
                        <input onChange={handleOnChange} className={styles.input} placeholder="Insira novo nome pra subcategoria" type="text" name="categoria" id="categoria" />
                        <button style={{ width: '320px', height: '40px' }} className={styles.botaoForm} >Salvar nome categoria</button>
                    </form>
                    <button onClick={handleVoltar} style={{ width: '320px', height: '40px' }} className={styles.botaoForm} >Voltar a página categoria</button>
                </div>
            </div>
        </div>
    );
}

export default EditarSubcategoria;