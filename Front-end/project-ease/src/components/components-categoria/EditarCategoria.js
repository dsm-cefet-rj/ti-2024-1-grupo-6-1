import React, { useState, useEffect } from 'react';
import styles from '../layout/Categorias.module.css';
import { useParams } from 'react-router-dom';

function Editar() {
    const { id } = useParams();
    const [categoria, setCategoria] = useState('');

    const [categoriaOriginal, setCategoriaOriginal] = useState('');

    useEffect(() => {
        fetch(`http://localhost:5000/categorias/${id}`, {
            method: 'GET',
            headers: { "Content-type": 'application/json' },
        }).then((resp) => {
            return resp.json()
        }).then((respJson) => setCategoriaOriginal(respJson))  // leva a resposta para o setProjeto para ter acesso aos dados
            .catch((erro) => console.log("Erro ao pegar seus projetos " + erro))
    }, [categoriaOriginal])


    console.log(id);

    function editarCat(event) {
        event.preventDefault();

        if (!categoria.trim()) {
            alert("Por favor, insira um nome para a categoria.");
            return;
        }

        fetch(`http://localhost:5000/categorias/${id}`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ categoria: categoria })
        }).then((resp) => {
            if (resp.ok) {
                alert("Categoria atualizada com sucesso!");
                window.location.href = '/categoria';
            } else {
                alert("Erro ao atualizar categoria");
            }
        }).catch((err) => console.log("Erro ao tentar atualizar categoria: " + err))
    }

    const handleOnChange = (e) => {
        setCategoria(e.target.value);
    };

    const handleVoltar = () => {
        window.location.href = '/categoria';
    }


    return (
        <div className={styles.modalContainer}>
            <div className={styles.modal}>
                <div>
                    <form id={styles.estilosForm} onSubmit={editarCat}>
                        <label htmlFor="categoria">Editar categoria {categoriaOriginal.categoria && categoriaOriginal.categoria.toUpperCase()}</label>
                        <input onChange={handleOnChange} className={styles.input} placeholder="Insira novo nome pra categoria" type="text" name="categoria" id="categoria" />
                        <button style={{ width: '320px', height: '40px' }} className={styles.botaoForm} >Salvar nome categoria</button>
                    </form>
                    <button onClick={handleVoltar} style={{ width: '320px', height: '40px' }} className={styles.botaoForm} >Voltar a página categoria</button>
                </div>
            </div>
        </div>
    );
}

export default Editar;
