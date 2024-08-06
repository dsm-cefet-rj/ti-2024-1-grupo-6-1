import React, { useState } from 'react';
import styles from './layout/Categorias.module.css';
import CryptoJS from 'crypto-js';

function ResetSenha() {
    const [email, setEmail] = useState('');
    const [novaSenha, setNewPassword] = useState('');
    const [userExists, setUserExists] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") {
            setEmail(value);
            setUserExists(false);
        } else if (name === "senha") {
            setNewPassword(value);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/login`);
            const data = await response.json();
            if (response.ok && data) {
                const user = data.find(user => user.email === email);
                if (user) {
                    const senhaCriptografada = CryptoJS.AES.encrypt(novaSenha, 'chave_secreta').toString();

                    const loginCriptografado = {
                        ...user, 
                        senha: senhaCriptografada 
                    };

                    setUserExists(true);
                    const patchResponse = await fetch(`http://localhost:5000/login/${user.id}`, {
                        method: "PATCH",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(loginCriptografado) 
                    });
                    if (patchResponse.ok) {
                        alert("Senha redefinida com sucesso!");
                        window.location.href = '/login';
                    } else {
                        alert("Erro ao redefinir senha");
                    }
                } else {
                    alert("E-mail não encontrado. Verifique o e-mail digitado.");
                }
            } else {
                alert("Erro ao buscar usuários do banco de dados.");
            }
        } catch (error) {
            console.error("Erro ao tentar redefinir senha: ", error);
            alert("Erro ao tentar redefinir senha. Verifique sua conexão e tente novamente.");
        }
    }



    const estilo = {
        marginLeft: '30px'
    };

    return (
        <main>
            <div id={styles.formulario}>
                <div id={styles.idForm}>
                    <h3 style={estilo}>Renovar Senha</h3>
                    <form id={styles.estilosForm} onSubmit={handleSubmit}>
                        <input className={styles.input} type="email" name="email" value={email} onChange={handleChange} placeholder="Seu e-mail" />
                        <input className={styles.input} type="password" name="senha" value={novaSenha} onChange={handleChange} placeholder="Nova senha" />
                        <button className={styles.botaoForm} style={{ width: '320px', height: '40px' }} type="submit">Redefinir senha</button>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default ResetSenha;
