import { useEffect, useState } from 'react';
import styles from './layout/MeusProjetos.module.css';
import ListaProjetos from './ListaProjetos';
import { Link } from 'react-router-dom';

function Projetos() {
  const [projetos, setProjetos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3005/projetos', {
      method: 'GET',
      headers: { 'Content-type': 'application/json' },
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('Erro na requisição');
        }
        return resp.json();
      })
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
    <div className={styles.projetoContainer}>
      <h1 className={styles.meusProjetos}><strong>Meus Projetos</strong></h1>
      <Link to="/criarProjeto">
        <button className={styles.criarProjeto}>Criar Projeto</button>
      </Link>
      <div className={styles.verProjetos}>
        {projetos.length > 0 && projetos.map((projeto) => (
          <ListaProjetos
            key={projeto.id || Math.random()}  // Garantindo uma key única
            id={projeto.id}
            nome={projeto.nome}
            orcamento={projeto.orcamento}
            // Acesso direto à string da categoria e subcategoria
            categoria={projeto.categoria || 'Sem categoria'}
            subcategoria={projeto.subcategoria || 'Sem subcategoria'}
            handleRemove={removerProjeto}
          />
        ))}
        {projetos.length === 0 && <p>Não há projetos cadastrados.</p>}
      </div>
    </div>
  );
}

export default Projetos;