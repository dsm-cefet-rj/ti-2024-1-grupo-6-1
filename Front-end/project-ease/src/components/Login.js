import React, { useState, useEffect } from 'react';
import styles from './layout/Categorias.module.css';
import { Link, useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';

function Login({ setIsLoggedIn }) {
    const navigate = useNavigate();
    const [loginInput, setLoginInput] = useState({ email: '', senha: '' });

    function handleOnChange(e) {
        setLoginInput({ ...loginInput, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        console.log('useEffect triggered');
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
            setIsLoggedIn(true);
        }
    }, [setIsLoggedIn]);

    function acessarConta(e) {
        e.preventDefault();
        fetch('http://localhost:3005/users/login', {
            method: "POST",
            headers: {
                "Authorization": "Basic " + btoa(loginInput.email + ":" + loginInput.senha),
                "Content-type": 'application/json'
            }
        }).then((resp) => {
            if (resp.ok) {
                localStorage.setItem('isLoggedIn', 'true');
                navigate('/');
                setIsLoggedIn(true);
            } else {
                alert("Login falhou. Verifique suas credenciais.");
            }
        }).catch((erro) => console.log("Erro ao fazer login: " + erro));
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
                        <input onChange={handleOnChange} value={loginInput.email} className={styles.input} placeholder="Insira seu e-mail" type="text" name="email" id={styles.nome}></input>
                        <input onChange={handleOnChange} value={loginInput.senha} className={styles.input} placeholder="Insira sua senha" type="password" name="senha" id={styles.subcategoria}></input>
                        <button className={styles.botaoForm} style={{ width: '320px', height: '40px' }}>Login administrador</button>
                      
                    </form>  
                        <Link to="/resetar-senha">
                            <button className={styles.botaoForm} style={{ width: '320px', height: '40px', marginTop: '10px' }}>Esqueceu sua senha?</button>
                        </Link>
                </div>
            </div>
        </main>
    );
}

export default Login;
 