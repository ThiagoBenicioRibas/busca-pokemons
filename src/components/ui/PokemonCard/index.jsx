function PokemonCard({ pokemon }) {
  return (
    <li>
      <img src={pokemon.image} alt={pokemon.name} />
      <h2>{pokemon.name}</h2>
      <p>ID: {pokemon.id}</p>
      <p>{pokemon.description}</p>
    </li>
  );
}


export default PokemonCard;