import React, { useState } from 'react';
import styles from './layout/categoria.module.css';
import CryptoJS from 'crypto-js';

function CadastrarUsuario() {
    const [login, setLogin] = useState({
        nome: '',
        email: '',
        senha: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!login.nome) {
            alert("Por favor, insira seu nome");
            return;
        }

        if (!login.senha) {
            alert("Por favor, insira sua senha");
            return;
        }

        fetch(`http://localhost:5000/login?email=${login.email}`, {
            method: "GET",
            headers: { "Content-type": "application/json" }
        })
            .then((resp) => resp.json())
            .then((respJson) => {
                if (respJson.length > 0) {
                    alert("Email já cadastrado");
                } else {
                    const senhaCriptografada = CryptoJS.AES.encrypt(login.senha, 'chave_secreta').toString();

                    const loginCriptografado = {
                        ...login,
                        senha: senhaCriptografada
                    };

                    fetch('http://localhost:5000/login', {
                        method: "POST",
                        headers: { "Content-type": 'application/json' },
                        body: JSON.stringify(loginCriptografado)
                    })
                        .then((resp) => resp.json())
                        .then((respJson) => {
                            console.log(respJson)
                            setLogin({
                                nome: '',
                                email: '',
                                senha: ''
                            });
                        })
                        .catch((erro) => console.log("Erro ao inserir no banco de dados"));
                }
            })
            .catch((erro) => console.log("Erro ao verificar email no banco de dados"));
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
                            <input onChange={handleOnChange} className={styles.input} placeholder="Insira seu nome" type="text" name="nome" id={styles.nome} value={login.nome}></input>
                            <input onChange={handleOnChange} className={styles.input} placeholder="Insira seu e-mail" type="email" name="email" id={styles.nome} value={login.email}></input>
                            <input onChange={handleOnChange} className={styles.input} placeholder="Insira sua senha" type="password" name="senha" id={styles.subcategoria} value={login.senha}></input>

                            <button className={styles.botaoForm} style={{ width: '320px', height: '40px' }}>Cadastrar</button>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}

export default CadastrarUsuario;
