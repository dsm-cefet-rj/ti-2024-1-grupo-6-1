import React from 'react';
import styles from './layout/categoria.module.css'



function Login() {
    const estilo = {
        marginLeft: '30px'
    };

    return (
        <>
            <main>
                <div id={styles.formulario}>
                    <div id={styles.idForm}>
                        <h3 style={estilo}>Login</h3>
                        <form id={styles.estilosForm}>
                            <input className={styles.input} placeholder="Insira seu e-mail" type="text" name="nome" id={styles.nome}></input>
                            <input className={styles.input} placeholder="Insira sua senha" type="password" name="subcategoria" id={styles.subcategoria}></input>
                            <button id={styles.botaoForm} style={{ width: '320px', height: '40px' }}>Login</button>
                        </form>
                    </div>
                </div>
                </main>
                </>
    );
}
            
export default Login