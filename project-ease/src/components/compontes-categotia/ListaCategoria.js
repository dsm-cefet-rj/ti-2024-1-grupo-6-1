import { useEffect, useState } from 'react';
import ListaCategoria from './mostrarCategoria'

function MostrarCategoriaNaDiv() {
    const [categoria, setCategoria] = useState(null);
    const [subcategoria, setSubcategoria] = useState(null);


    useEffect(() => {
        fetch('http://localhost:5000/categorias', {
            method: 'GET',
            headers: { "Content-type": 'application/json' },
        }).then((resp) => {
            return resp.json()
        }).then((respJson) => setCategoria(respJson))  // leva a resposta para o setProjeto para ter acesso aos dados
            .catch((erro) => console.log("Erro ao pegar seus projetos " + erro))
    }, [categoria])

    useEffect(() => {
        fetch('http://localhost:5000/subcategoria', {
            method: 'GET',
            headers: { "Content-type": 'application/json' },
        }).then((resp) => {
            return resp.json()
        }).then((respJson) => setSubcategoria(respJson))  // leva a resposta para o setProjeto para ter acesso aos dados
            .catch((erro) => console.log("Erro ao pegar seus projetos " + erro))
    }, [])

    function removerCategoria(id) {
        console.log("IDCATEGORIA" + id)
        fetch(`http://localhost:5000/categorias/${id}`, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
        }).then((resp) => {
            return resp.json()
        }).then(() => {
            setCategoria(categoria.filter(categoria => categoria.id !== id));
        })
            .catch((err) => console.log("Erro ao tentar remover projeto: " + err))

        if (subcategoria) {
            subcategoria.forEach((subcat) => {
                if (subcat.idCategoria === id) {
                    fetch(`http://localhost:5000/subcategoria/${subcat.id}`, {
                        method: "DELETE",
                        headers: { 'Content-Type': 'application/json' },
                    })
                        .then((resp) => resp.json())
                        .then(() => {
                            setSubcategoria(subcategoria.filter(subcategoria => subcategoria.id !== subcat.id));
                        })
                        .catch((err) => console.log("Erro ao tentar remover subcategoria: " + err));
                }
            });
        }
    }


    return (
        <>

            {
                categoria &&
                categoria.map((p) => (   
                    <ListaCategoria id={p.id} categoria={p.categoria} handleRemove={removerCategoria} />

                ))
            }

        </>
    );
}

export default MostrarCategoriaNaDiv
