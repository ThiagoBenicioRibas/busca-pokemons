const urlBase = 'https://pokeapi.co/api/v2';
const limite = 20;

export async function pegarPokemons(inicio = 0, url = null) {
  const resposta = await fetch(url ? url : `${urlBase}/pokemon?limit=${limite}&offset=${inicio}`);
  const respostaJson = await resposta.json();
  const detalhes = await pegarDetalhes(respostaJson?.results);
  return { ...respostaJson, details: detalhes };
}

export async function pegarDetalhes(listaPokemons) {
  const informacoesPokemons = await Promise.all(
    listaPokemons?.map(async (pokemon) => {
      const respostaDetalhes = await fetch(pokemon?.url);
      const respostaDetalhesJson = await respostaDetalhes.json();
      return respostaDetalhesJson;
    })
  );
  return formatarPokemons(informacoesPokemons);
}

export function formatarPokemons(listaPokemons) {
  return listaPokemons.map((item) => ({
    id: item.id,
    nome: item.name,
    peso: item.weight,
    imagem:
      item.id > 930
        ? item.sprites.front_default
        : `https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/other/showdown/${item?.id}.gif`,
  }));
}
