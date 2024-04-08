function ListaServico({id, nome, custo, descricao, handleRemove}) {

    const remover = (e) => {
        e.preventDefault()
        handleRemove(id, custo)
    }

    return (
        <div>
            <h4>{nome}</h4>
            <p>
                <span>Custo total:</span> R${custo}
            </p>
            <p>{descricao}</p>
            <div>
                <button onClick={remover}>
                    Excluir
                </button>
            </div>
        </div>
    )
}

export default ListaServico