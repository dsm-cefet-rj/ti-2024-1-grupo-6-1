import styles from './layout/FormProjeto.module.css'
import Input from './form/Input';
import Select from './form/Select';
import SubmitButton from './form/SubmitButton';

import { useState, useEffect } from 'react';

function ProjectForm({handleSubmit, btnText, projectData}){

    const [categories, setCategories] = useState([]);

    const bdTemporario = "http://localhost:5000/categorias"

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
                setCategories(categoriasJson)
            })
            .catch(err=>console.log("Deu erro: " + err))
        }, [])

        const [project, setProject] = useState(projectData || {})

        const submit = (e) => {
            e.preventDefault()
            handleSubmit(project)
        }

        function handleOnChange(e){
            setProject({...project, [e.target.name]: e.target.value})
        }

        function handleSelect(e){
            setProject({...project, categoria: {
                id: e.target.value,
                categoria: e.target.options[e.target.selectedIndex].text
            }})
            
        }

        console.log(project)

    return(
        <form className={styles.form} onSubmit={submit}>
            <Input 
                type="text"
                text="Nome do projeto"
                name="nome"
                placeholder={project.nome}
                handleOnChange={handleOnChange}
                value={project.nome ? project.nome: ''}
            />
            <Input 
                type="number"
                text="Orçamento do projeto"
                name="orcamento"
                placeholder={project.orcamento}
                handleOnChange={handleOnChange}
                value={project.orcamento ? project.orcamento : ''}
            />
            
            <Select
                name="category_ig"
                text={"Selecione a categoria"}
                option={categories}
                handleOnChange={handleSelect}
                value={project.categoria ? project.categoria.id : ''}
                />
            
            <SubmitButton text={btnText} />

        </form>
    )
}

export default ProjectForm;