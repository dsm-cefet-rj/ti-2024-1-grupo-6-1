import styles from './layout/FormProjeto.module.css'
import Input from './form/Input';
import Select from './form/Select';
import SubmitButton from './form/SubmitButton';

import { useState, useEffect } from 'react';

function FormProjeto({handleSubmit, btnText, projectData}){

    const [categorias, setCategorias] = useState([]);
    const [projeto, setProjeto] = useState(projectData || {})
    const [subcategories, setSubCategories] = useState([]);

    const bdTemporario = "http://localhost:5000/categorias"
    const bdTemporario2 = "http://localhost:5000/subcategoria"

    useEffect(
        () => {
            fetch(bdTemporario,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((categorias) => {
                return categorias.json()
            })
            .then((categoriasJson) => {
                setCategorias(categoriasJson)
            })
            .catch(err=>console.log("Deu erro: " + err))
        }, [])

        useEffect(
            () => {
                fetch(bdTemporario2,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then((subcategorias) => {
                    return subcategorias.json()
                })
                .then((subcategoriasJson) => {
                    setSubCategories(subcategoriasJson)
                })
                .catch(err=>console.log("Deu erro: " + err))
            }, [])

        const submit = (e) => {
            e.preventDefault()
            handleSubmit(projeto)
        }

        function handleOnChange(e){
            setProjeto({...projeto, [e.target.name]: e.target.value})
        }

        const [filteredSubcategories, setFilteredSubcategories] = useState([]);

    function handleSelect(e){
        const selectedCategoryId = e.target.value;
        const filteredSubcategories = subcategories.filter(subcategoria => subcategoria.idCategoria === selectedCategoryId);
        setFilteredSubcategories(filteredSubcategories);
        setProjeto({...projeto, categoria: {
            id: selectedCategoryId,
            categoria: e.target.options[e.target.selectedIndex].text
        }})
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
        console.log(projeto)

    return(
        <form className={styles.form} onSubmit={submit}>
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
                option={categorias}
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
            
            <SubmitButton text={btnText} />

        </form>
    )
}

export default FormProjeto