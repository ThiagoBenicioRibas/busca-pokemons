function PokemonCard({ pokemon }) {
  return (
    <li>
      <img src={pokemon.image} alt={pokemon.name} />
      <h2>{pokemon.name}</h2>
      <p>ID: {pokemon.id}</p>
t      <p>{pokemon.description}</p>
    </li>
  );
}


export default PokemonCard;