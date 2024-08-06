import { useState } from 'react'
import Input from './form/Input';
import SubmitButton from './form/SubmitButton';
import styles from './layout/FormProjeto.module.css'

function FormServico({handleSubmit, btnText, projectData }) {

    const [servico, setServico] = useState([])

    function submit(e) {
        e.preventDefault()
        projectData.servicos.push(servico)
        handleSubmit(projectData)
    }

    function handleChange(e) {
        setServico({ ...servico, [e.target.name]: e.target.value})
    }

    return (
        <form className={styles.form} onSubmit={submit}>
            <Input 
                type='text'
                text='Nome do serviço'
                name='nome'
                placeholder='Insira o nome do serviço'
                handleOnChange={handleChange}
            />
            <Input 
                type='number'
                text='Custo do serviço'
                name='custo'
                placeholder='Insira o valor total'
                handleOnChange={handleChange}
            />
            <Input 
                type='text'
                text='Descrição do serviço'
                name='descricao'
                placeholder='Descreva o serviço'
                handleOnChange={handleChange}
            />
            <SubmitButton text={btnText}/>
        </form>
    )
}

export default FormServico