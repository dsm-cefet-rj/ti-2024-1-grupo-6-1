import { useEffect, useState } from 'react';
import styles from './layout/MeusProjetos.module.css';
import ListaProjetos from './ListaProjetos';
import { Link } from 'react-router-dom';

function Projetos() {
  const [projetos, setProjetos] = useState([]);

  useEffect(() => {
    // Certifique-se de que a URL e a porta do back-end estejam corretas
    fetch('http://localhost:3005/projetos', {
      method: 'GET',
      headers: { 'Content-type': 'application/json' },
    })
      .then((resp) => resp.json())
      .then((data) => setProjetos(data))
      .catch((error) => console.log('Erro ao obter projetos:', error));
  }, []);

  function removerProjeto(id) {
    fetch(`http://localhost:3005/projetos/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(() => setProjetos(projetos.filter((projeto) => projeto.id !== id)))
      .catch((error) => console.log('Erro ao remover projeto:', error));
  }

  return (
    <div className={styles.projetos}>
      <h1 className={styles.meusProjetos}><strong>Meus Projetos</strong></h1>
      <Link to="/criarProjeto">
        <button className={styles.criarProjeto}>Criar Projeto</button>
      </Link>
      <div className={styles.verProjetos}>
        {projetos.length > 0 && projetos.map((projeto) => (
          <ListaProjetos
            key={projeto.id}
            id={projeto.id}
            nome={projeto.nome}
            orcamento={projeto.orcamento}
            categoria={projeto.categoria ? projeto.categoria.categoria : null}
            subcategoria={projeto.subcategoria ? projeto.subcategoria.subcategoria : null}
            handleRemove={removerProjeto}
          />
        ))}
        {projetos.length === 0 && <p>Não há projetos cadastrados.</p>}
      </div>
    </div>
  );
}

export default Projetos;