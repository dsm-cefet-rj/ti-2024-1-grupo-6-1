import React, { useState, useEffect } from 'react';
import styles from './layout/Categorias.module.css';
import { Link, useNavigate } from 'react-router-dom';

function Login({ setIsLoggedIn }) {
    const navigate = useNavigate();
    const [loginInput, setLoginInput] = useState({ email: '', senha: '' });

    function handleOnChange(e) {
        setLoginInput({ ...loginInput, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
            setIsLoggedIn(true);
        }
    }, [setIsLoggedIn]);

    async function acessarConta(e) {
        e.preventDefault();

        const response = await fetch('http://localhost:3005/auth/login', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                email: loginInput.email,
                password: loginInput.senha
            }),
        });

        const data = await response.json();

        if (response.status === 200) {
            alert("Login realizado com sucesso!");
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('token', data.token); // Salva o token no localStorage
            navigate('/');
            setIsLoggedIn(true);
        } else {
            alert(data.msg || "Erro ao realizar login");
        }
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