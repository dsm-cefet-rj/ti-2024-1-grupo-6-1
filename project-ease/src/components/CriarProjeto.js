import React from 'react';
import { useState, useEffect } from 'react';
import styles from './layout/CriarProjeto.module.css'
import Input from './form/Input';
import Select from './form/Select';
import SubmitButton from './form/SubmitButton';
import { useNavigate } from 'react-router-dom'

function CriarProjeto(){

    const [projeto, setProjeto] = useState({})
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubCategories] = useState([]);
    const navigate = useNavigate()

    const novoProjeto = (e)=>{
        e.preventDefault(); // Não atualiza a página
        // Verifica se todos os campos obrigatórios foram preenchidos
        if (!projeto.nome || !projeto.orcamento || !projeto.categoria || !projeto.subcategoria) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        projeto.custo = 0;
        projeto.servicos = [];
        
        fetch('http://localhost:5000/projetos', {
            // Post - publica,    Get - pega,    Patch/Put - atualiza
            method: "POST",
            headers: {"Content-type": 'application/json'},   // Colocando um JSON
            body: JSON.stringify(projeto)   // Transforma em uma string JSON
        }).then((resp) => {  // Pega a resposta do banco de dados
            return resp.json();  // Transforma a string em um objeto
        }).then((respJson) => {
            console.log(respJson);
            const state = { mensagem: "Projeto criado com sucesso!" };
            navigate("/projetos", {state});
        })  // Imprime a resposta
        .catch((erro) => console.log("Erro ao inserir no banco de dados"));
        
    }

    const bdTemporario = "http://localhost:5000/categorias";
    const bdTemporario2 = "http://localhost:5000/subcategoria";

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

    useEffect(
        () => {
            fetch(bdTemporario2,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((subcategorias) => {
                return subcategorias.json();
            })
            .then((subcategoriasJson) => {
                setSubCategories(subcategoriasJson);
            })
            .catch(err=>console.log("Deu erro: " + err));
        }, []
    );

    //const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [filteredSubcategories, setFilteredSubcategories] = useState([]);

    function handleSelect(e){
        const selectedCategoryId = e.target.value;
        const filteredSubcategories = subcategories.filter(subcategoria => subcategoria.idCategoria === selectedCategoryId);
        setFilteredSubcategories(filteredSubcategories);
        setProjeto({...projeto, categoria: {
            id: selectedCategoryId,
            categoria: e.target.options[e.target.selectedIndex].text
        }});
        
    }

    function handleSubcategorySelect(e) {
        const selectedSubcategoryId = e.target.value;
        const selectedSubcategory = filteredSubcategories.find(subcategoria => subcategoria.id === selectedSubcategoryId);
    
        setProjeto({
            ...projeto,
            subcategoria: {
                id: selectedSubcategoryId,
                subcategoria: selectedSubcategory.subcategoria
            }
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
                name="category_ig"
                text={"Selecione a categoria"}
                option={categories}
                handleOnChange={handleSelect}
                value={projeto.categoria ? projeto.categoria.id : ''}
                />
            
            <Select
                name="subcategory_ig"
                text={"Selecione a subcategoria"}
                option={filteredSubcategories}
                handleOnChange={handleSubcategorySelect}
                value={projeto.subcategoria ? projeto.subcategoria.id : ''}
                />

            <SubmitButton text={'Criar Projeto'} />

            </form>
        </div>
    );
}

export default CriarProjeto;