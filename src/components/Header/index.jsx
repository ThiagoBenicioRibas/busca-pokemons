function Header({ onSearchChange }) {
  function handleSubmit(event) {
    event.preventDefault(); 
  }

  return (
    <header>
      <h1>Busca Pokémons</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="searchInput">Filtrar Pokémon:</label>
        <input
          type="text"
          placeholder="Digite o nome..."
          id="searchInput"
          onInput={onSearchChange} // filtra enquanto digita
        />
      </form>
    </header>
  );
}

export default Header;
