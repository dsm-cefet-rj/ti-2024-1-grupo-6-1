// Login.js
import React, { useState } from 'react';
import styles from './layout/categoria.module.css';
import { Link ,useNavigate  } from 'react-router-dom';
import CryptoJS from 'crypto-js';

function Login({ setIsLoggedIn }) {
    const navigate = useNavigate();
    const [login, setLogin] = useState([]);
    const [LoginInput, setLoginInput] = useState([]);

    function handleOnChange(e) {
        setLoginInput({ ...LoginInput, [e.target.name]: e.target.value });
    }

    function acessarConta(e) {
        e.preventDefault();
        fetch('http://localhost:5000/login', {
            method: "GET",
            headers: { "Content-type": 'application/json' },
        }).then((resp) => {
            return resp.json();
        }).then((respJson) => {
            const usuarioEncontrado = respJson.find((usuario) => usuario.email === LoginInput.email);
            
            if (usuarioEncontrado) {
                const senhaDescriptografada = CryptoJS.AES.decrypt(usuarioEncontrado.senha, 'chave_secreta').toString(CryptoJS.enc.Utf8);
                if (senhaDescriptografada === LoginInput.senha) {
                    alert("Usuário encontrado. Realizando login.");
                    navigate('/');
                    setIsLoggedIn(true);
                } else {
                    alert("Senha incorreta. Por favor, verifique suas credenciais.");
                }
            } else {
                alert("Usuário não encontrado. Por favor, verifique suas credenciais.");
            }
            setLogin(respJson);
        }).catch((erro) => console.log("Erro ao pegar seus projetos " + erro));
    }

    const estilo = {
        marginLeft: '30px'
    };

    return (
        <main>
            <div id={styles.formulario}>
                <div id={styles.idForm}>
                    <h3 style={estilo}>Login</h3>
                    <form id={styles.estilosForm} onSubmit={acessarConta}>
                        <input onChange={handleOnChange} className={styles.input} placeholder="Insira seu e-mail" type="text" name="email" id={styles.nome}></input>
                        <input onChange={handleOnChange} className={styles.input} placeholder="Insira sua senha" type="password" name="senha" id={styles.subcategoria}></input>
                        <button onClick={acessarConta} className={styles.botaoForm} style={{ width: '320px', height: '40px' }}>Login</button>
                        <Link to="/cadastrar">
                            <button className={styles.botaoForm} style={{ width: '320px', height: '40px' }}>Cadastrar</button>
                        </Link>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default Login;
