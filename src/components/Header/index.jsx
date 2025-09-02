import logo from '../../assets/imagens/logo-buscador-pokemons.png';
import './headerStyle.css';

function Header({ searchTerm, onSearchChange, onSearchSubmit }) {
    return (
        <header className="header-container">
            <img
                src={logo}
                alt="Logo do Busca Pokémons: uma lupa sobre uma Pokébola."
                className="header-logo"
            />
            <p>
                Sua jornada para se tornar um Mestre Pokémon começa aqui. Pesquise, filtre e explore a Pokédex.
            </p>
            <form role="search" onSubmit={onSearchSubmit}>
                <label htmlFor="pokemon-search" className="visually-hidden">Buscar Pokémon</label>
                <input
                    type="text"
                    id="pokemon-search"
                    placeholder="Buscar Pokémon..."
                    value={searchTerm}
                    onChange={onSearchChange}
                />
                <button type="submit">
                    Buscar
                </button>
            </form>
        </header>
    );
}


export default Header;