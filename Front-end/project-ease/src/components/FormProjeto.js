import styles from './layout/FormProjeto.module.css'
import Input from './form/Input';
import Select from './form/Select';
import SubmitButton from './form/SubmitButton';

import { useState, useEffect } from 'react';

function FormProjeto({handleSubmit, btnText, projectData}){

    const [projeto, setProjeto] = useState(projectData || {});
    const [subcategories, setSubCategories] = useState([]);

    useEffect(() => {
        if (projeto.categoria) {
            const filteredSubcategories = subcategories.filter(subcategoria => subcategoria.idCategoria === projeto.categoria.id);
            setFilteredSubcategories(filteredSubcategories);
        }
    }, [projeto.categoria, subcategories]);

    const submit = (e) => {
        e.preventDefault();
        handleSubmit(projeto);
    }

    function handleOnChange(e){
        setProjeto({...projeto, [e.target.name]: e.target.value});
    }

    const [filteredSubcategories, setFilteredSubcategories] = useState([]);

    function handleSubcategorySelect(e) {
        const selectedSubcategoryId = e.target.value;
        if (selectedSubcategoryId === '') {
            setProjeto({ ...projeto, subcategoria: null });
        } else {
            const selectedSubcategory = filteredSubcategories.find(subcategoria => subcategoria.id === selectedSubcategoryId);
            setProjeto({
                ...projeto,
                subcategoria: {
                    id: selectedSubcategoryId,
                    subcategoria: selectedSubcategory ? selectedSubcategory.subcategoria : ''
                }
            });
        }
    }

    return(
        <form className={styles.form} onSubmit={submit}>
            <Input 
                type="text"
                text="Nome do projeto"
                name="nome"
                placeholder={projeto.nome}
                handleOnChange={handleOnChange}
                value={projeto.nome ? projeto.nome : ''}
            />
            <Input 
                type="number"
                text="Orçamento do projeto"
                name="orcamento"
                placeholder={projeto.orcamento}
                handleOnChange={handleOnChange}
                value={projeto.orcamento ? projeto.orcamento : ''}
            />
            <Input 
                type="text"
                text="Categoria do projeto"
                name="categoria"
                placeholder={projeto.categoria}
                handleOnChange={handleOnChange}
                value={projeto.categoria ? projeto.categoria : ''}
            />
            
            
                
            <SubmitButton text={btnText} />

        </form>
    )
}

export default FormProjeto;