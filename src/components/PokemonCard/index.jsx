import './style.css';

function PokemonCard({ nome, imagem, peso }) {
  return (
    <article className="pokemon-container">
      <img src={imagem} alt={`Imagem do Pokémon ${nome}`} />
      <div className="pokemon-text">
        <h3>{nome}</h3>
        <p>O Pokémon {nome} pesa {peso} kgs</p>
      </div>
    </article>
  );
}


export default PokemonCard;