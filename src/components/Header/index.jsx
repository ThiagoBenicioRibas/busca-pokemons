import logo from '../../assets/imagens/logo-busca-pokemons.png';
import './style.css';

function Header({ termoBusca, aoMudarBusca, onSearch }) {
  const aoEnviarFormulario = (evento) => {
    evento.preventDefault();
    if (termoBusca.trim() !== '') {
      onSearch(termoBusca.trim().toLowerCase());
    }
  };

  return (
    <header className="header">
      <div className="logo-busca-pokemons">
        <img
          src={logo}
          alt="Logo do Busca Pokémons: uma lupa sobre uma Pokébola."
        />
        <h1>Busca-pokémons</h1>
      </div>

      <form className="formulario-header" onSubmit={aoEnviarFormulario}>
        <label htmlFor="pokemon-busca" className="visually-hidden">
          Buscar pokémon
        </label>
        <input
          type="text"
          id="pokemon-busca"
          placeholder="Buscar pokemon..."
          value={termoBusca}
          onChange={aoMudarBusca}
        />
        <button type="submit">Buscar</button>
      </form>
    </header>
  );
}


export default Header;