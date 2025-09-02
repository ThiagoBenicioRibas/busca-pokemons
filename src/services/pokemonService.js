const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export async function getPokemonList(limit = 20, offset = 0) {
    const response = await fetch(`${POKEAPI_BASE_URL}?limit=${limit}&offset=${offset}`);
    const data = await response.json();
    return data;
}


export async function getPokemonDetails(url) {
    const res = await fetch(url);
    const pokemon = await res.json();
    return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.front_default,
        description: `Este é um Pokémon com o ID ${pokemon.id}.`
    };
}