import styles from './layout/MeusProjetos.module.css'

function ListaServico({id, nome, custo, descricao, handleRemove}) {

    const remover = (e) => {
        e.preventDefault()
        handleRemove(id, custo)
    }

    return (
        <div className ={styles.projeto}> 
            <h4 className ={styles.nomeProjeto}>{nome}</h4>
            <p className ={styles.orçamento}>
                <span>Custo total:</span> R${custo}
            </p>
            <p className ={styles.categoria}>{descricao}</p>
            <div>
                <button  className ={styles.excluir} onClick={remover}>
                    Excluir
                </button>
            </div>
        </div>
    )
}

export default ListaServico