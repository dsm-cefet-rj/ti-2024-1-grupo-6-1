import styles from './layout/MeusProjetos.module.css'
import { useState } from 'react'

function ListaServico({id, nome, custo, descricao, handleRemove, handleEdit}) {

    const remover = (e) => {
        e.preventDefault()
        handleRemove(id, custo)
        window.location.reload();
    }

    const editar = (e) => {
        e.preventDefault();
        handleEdit({ id, nome, custo, descricao });
    }

    const [emEdicao, setEmEdicao] = useState(false);
    const [editarServico, setEditarServico] = useState({ id, nome, custo, descricao });

    const handleEditClick = () => {
        setEmEdicao(true);
    };

    const handleCancelEdit = () => {
        setEmEdicao(false);
    };

    const handleSaveEdit = () => {
        // Aqui você pode implementar a lógica para salvar as edições,
        // fazendo uma solicitação PATCH para atualizar o serviço no projeto.
        console.log('Salvar edições:', editarServico);
        setEmEdicao(false);
        handleEdit(editarServico);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditarServico({ ...editarServico, [name]: value });
    };

    return (
        <div className={styles.projeto}>
            <h4 className={styles.nomeProjeto}>{nome}</h4>
            <p className={styles.orçamento}>
                <span>Custo total:</span> R${custo}
            </p>
            <p className={styles.categoria}>{descricao}</p>
            <div>
                {emEdicao ? (
                    <div>
                        <input
                            type="text"
                            name="nome"
                            value={editarServico.nome}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="custo"
                            value={editarServico.custo}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="descricao"
                            value={editarServico.descricao}
                            onChange={handleChange}
                        />
                        <button onClick={handleSaveEdit}>Salvar</button>
                        <button onClick={handleCancelEdit}>Cancelar</button>
                    </div>
                ) : (
                    <div>
                       <button className={styles.excluir} onClick={remover}>
                            Excluir
                        </button>
                        <button className={styles.excluir} onClick={handleEditClick}>
                            Editar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ListaServico