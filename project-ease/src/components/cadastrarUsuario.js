import React, { useState } from 'react';
import styles from './layout/categoria.module.css';
import CryptoJS from 'crypto-js';
import { Link } from 'react-router-dom';

function CadastrarUsuario() {
    const [login, setLogin] = useState([]);

    const handleSubmit = (e) => {
        //e.preventDefault();

        // pra criptografar a senha usando o crypt-js
        const senhaCriptografada = CryptoJS.AES.encrypt(login.senha, 'chave_secreta').toString();

        const loginCriptografado = {
            ...login,
            senha: senhaCriptografada
        };

        fetch('http://localhost:5000/login', {
            method: "POST",
            headers: { "Content-type": 'application/json' },
            body: JSON.stringify(loginCriptografado)
        }).then((resp) => {
            return resp.json()
        }).then((respJson) => console.log(respJson))
            .catch((erro) => console.log("Erro ao inserir no banco de dados"));
    }

    function handleOnChange(e) {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    
    const estilo = {
        marginLeft: '30px'
    };

    return (
        <>
            <main>
                <div id={styles.formulario}>
                    <div id={styles.idForm}>
                        <h3 style={estilo}>Cadastrar usuário</h3>
                        <form id={styles.estilosForm} onSubmit={handleSubmit}>
                            <input onChange={handleOnChange} className={styles.input} placeholder="Insira seu nome" type="text" name="CPF" id={styles.nome}></input>
                            <input onChange={handleOnChange} className={styles.input} placeholder="Insira seu e-mail" type="text" name="email" id={styles.nome}></input>
                            <input onChange={handleOnChange} className={styles.input} placeholder="Insira sua senha" type="password" name="senha" id={styles.subcategoria}></input>
                           
                            <button className={styles.botaoForm} style={{ width: '320px', height: '40px' }}>Cadastrar</button>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}

export default CadastrarUsuario;
