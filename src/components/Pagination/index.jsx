import './style.css';

function Pagination({ navegar, navegarPrimeiraOuUltima, fornecerFeedback }) {
  const handleNavegar = async (eProximo) => {
    await navegar(eProximo);
    fornecerFeedback(
      eProximo ? 'Você foi para a próxima página de resultados.' : 'Você foi para a página anterior de resultados.'
    );
  };

  const handlePrimeiraOuUltima = async (destino) => {
    await navegarPrimeiraOuUltima(destino);
    fornecerFeedback(destino === 'primeira' ? 'Você foi para a primeira página de resultados.' : 'Você foi para a última página de resultados.');
  };

  return (
    <div className="pagination-container">
      <button onClick={() => handlePrimeiraOuUltima('primeira')}>Primeira Página</button>
      <button onClick={() => handleNavegar(false)}>Página Anterior</button>
      <button onClick={() => handleNavegar(true)}>Próxima Página</button>
      <button onClick={() => handlePrimeiraOuUltima('ultima')}>Última Página</button>
    </div>
  );
}


export default Pagination;