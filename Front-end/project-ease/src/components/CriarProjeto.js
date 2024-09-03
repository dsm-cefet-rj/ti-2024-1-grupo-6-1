import React, { useState, useEffect } from 'react';
import styles from './layout/CriarProjeto.module.css';
import Input from './form/Input';
import SubmitButton from './form/SubmitButton';
import { useNavigate } from 'react-router-dom';

function CriarProjeto(projetoData) {
    const [projeto, setProjeto] = useState({});
    const navigate = useNavigate();

    const novoProjeto = (e) => {
        e.preventDefault();

        // Verifica se todos os campos obrigatórios foram preenchidos
        if (!projeto.nome || !projeto.orcamento || !projeto.categoria) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const projetoData = {
            ...projeto,
            custo: 0,
            servicos: []
        };

        fetch('http://localhost:3005/projetos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projetoData),
        })
        .then(resp => {
            if (!resp.ok) {
                throw new Error('Erro na criação do projeto');
            }
            return resp.json();
        })
        .then(data => {
            console.log('Projeto criado com sucesso:', data);
            navigate('/projetos'); // Redireciona para a página de projetos
        })
        .catch(error => console.error('Erro ao criar projeto:', error));
    };

    function handleOnChange(e) {
        setProjeto({ ...projeto, [e.target.name]: e.target.value });
        console.log('projeto: ' + projeto.nome);
         console.log('orcamento: ' + projeto.orcamento);
          console.log('categoria: ' + projeto.categoria);
    }

    return (
        <div className={styles.estilo}>
            <h1 className={styles.titulo}>Crie o seu projeto</h1>
            <p className={styles.subtitulo}>Adicione serviços após a criação</p>
            <form className={styles.estiloForm} onSubmit={novoProjeto}>
                <Input 
                    type="text"
                    text="Nome do projeto"
                    name="nome"
                    placeholder="Insira o nome do projeto"
                    handleOnChange={handleOnChange}
                    value={projeto.nome || ''}
                />
                <Input 
                    type="number"
                    text="Orçamento do projeto"
                    name="orcamento"
                    placeholder="Insira o orçamento"
                    handleOnChange={handleOnChange}
                    value={projeto.orcamento || ''}
                />
                <Input 
                    type="text"
                    text="Categoria do projeto"
                    name="categoria"
                    placeholder="Insira uma categoria"
                    handleOnChange={handleOnChange}
                    value={projeto.categoria || ''}
                />
                <SubmitButton text="Criar Projeto" />
            </form>
        </div>
    );
}

export default CriarProjeto;