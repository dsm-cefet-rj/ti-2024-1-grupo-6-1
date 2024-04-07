import { useEffect, useState } from 'react';
import ListaCategoria from './mostrarCategoria'

function MostrarCategoriaNaDiv() {
    const [categoria, setCategoria] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/categorias', {
            method: 'GET',
            headers: { "Content-type": 'application/json' },
        }).then((resp) => {
            return resp.json()
        }).then((respJson) => setCategoria(respJson))  // leva a resposta para o setProjeto para ter acesso aos dados
            .catch((erro) => console.log("Erro ao pegar seus projetos " + erro))
    }, [])


    return (
        <>

            {
                categoria &&
                categoria.map((p) => (   //pega todo o projeto(p) que esta dentro dessa lista projeto
                    <ListaCategoria id={p.id} categoria={p.categoria}/>
                    
                ))
            }

        </>
    );
}

export default MostrarCategoriaNaDiv
