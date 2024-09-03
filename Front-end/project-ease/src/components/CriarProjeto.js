import React from 'react';
import { useState, useEffect } from 'react';
import styles from './layout/CriarProjeto.module.css'
import Input from './form/Input';
import Select from './form/Select';
import SubmitButton from './form/SubmitButton';
import { useNavigate } from 'react-router-dom'

function CriarProjeto(projetoData){

    const [projeto, setProjeto] = useState({})
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubCategories] = useState([]);
    const navigate = useNavigate()

    const novoProjeto = (e) => {
    e.preventDefault();

    // Verifica se todos os campos obrigatórios foram preenchidos
    if (!projeto.nome || !projeto.orcamento) {
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
        console.log(resp)
        return resp.json();
    })
    .then(data => {
        console.log('Projeto criado com sucesso:', data);
        navigate('/projetos'); // Redireciona para a página de projetos
    })
    .catch(error => console.error('Erro ao criar projeto:', error))

    console.log(projetoData)

    };

    const bdTemporario = "http://localhost:3005/categorias";
  

    useEffect(
        () => {
            fetch(bdTemporario,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((categorias) => {
                return categorias.json();
            })
            .then((categoriasJson) => {
                setCategories(categoriasJson);
            })
            .catch(err=>console.log("Deu erro: " + err));
        }, []
    );


    //const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [filteredSubcategories, setFilteredSubcategories] = useState([]);

    function handleSelect(e) {
        const selectedCategoryId = e.target.value;
        setProjeto({
            ...projeto,
            categoria: selectedCategoryId // Armazena o ID da categoria
        });
    }
    
    function handleSubcategorySelect(e) {
        const selectedSubcategoryId = e.target.value;
        setProjeto({
            ...projeto,
            subcategoria: selectedSubcategoryId // Use diretamente o ID
        });
    }
    

    function handleOnChange(e){
        setProjeto({...projeto, [e.target.name]: e.target.value}); //projeto.nome, projeto.orcamento, projeto.categoria
        console.log('projeto: ' + projeto.nome);
        console.log('orcamento: ' + projeto.orcamento);
        console.log('categoria: ' + projeto.categoria);
        console.log('subcategoria: ' + projeto.subcategoria);
    }

    return(
        <div className={styles.estilo}>
            <h1 className={styles.titulo}> Crie o seu projeto</h1>
            <p className={styles.subtitulo}> Adicione serviços após a criação</p>
            <form className={styles.estiloForm} onSubmit={novoProjeto}>
            <Input 
                type="text"
                text="Nome do projeto"
                name="nome"
                placeholder={projeto.nome}
                handleOnChange={handleOnChange}
                value={projeto.nome ? projeto.nome: ''}
            />
            <Input 
                type="number"
                text="Orçamento do projeto"
                name="orcamento"
                placeholder={projeto.orcamento}
                handleOnChange={handleOnChange}
                value={projeto.orcamento ? projeto.orcamento : ''}
            />
            
            <Select
                name="category_id"
                text={"Selecione a categoria"}
                option={categories}
                handleOnChange={handleSelect}
                value={projeto.categoria ? projeto.categoria : ''}
            />

            <SubmitButton text={'Criar Projeto'} />

            </form>
        </div>
    );
}

export default CriarProjeto;