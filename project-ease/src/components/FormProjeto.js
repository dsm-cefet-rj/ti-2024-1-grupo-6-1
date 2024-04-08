import styles from './layout/FormProjeto.module.css'
import Input from './form/Input';
import Select from './form/Select';
import SubmitButton from './form/SubmitButton';

import { useState, useEffect } from 'react';

function FormProjeto({handleSubmit, btnText, projectData}){

    const [categorias, setCategorias] = useState([]);
    const [projeto, setProjeto] = useState(projectData || {})

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
                setCategorias(categoriasJson)
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

        function handleSelect(e){
            setProjeto({...projeto, categoria: {
                id: e.target.value,
                categoria: e.target.options[e.target.selectedIndex].text
            }})
            
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
            
            <SubmitButton text={btnText} />

        </form>
    )
}

export default FormProjeto;