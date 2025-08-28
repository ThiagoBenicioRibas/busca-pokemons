import Header from '../../components/Header';
import Main from '../../components/Main';
import Footer from '../../components/Footer';
import { getPokemonList, getPokemonDetails } from '../../services/pokemonService';

let allPokemons = []; // armazena todos os pokémons carregados

async function carregarPokemons() {
  const basicList = await getPokemonList(500);
  const detailedList = [];

  for (let i = 0; i < basicList.length; i++) {
    const details = await getPokemonDetails(basicList[i].url);
    detailedList.push(details);
  }

  allPokemons = detailedList;
  exibirPokemons(allPokemons);
}

function exibirPokemons(lista) {
  const container = document.getElementById('pokemonList');
  container.innerHTML = '';
  lista.forEach(p => {
    const li = document.createElement('li');
    li.innerHTML = `
      <img src="${p.image}" alt="${p.name}" />
      <h2>${p.name}</h2>
      <p>ID: ${p.id}</p>
      <p>${p.description}</p>
    `;
    container.appendChild(li);
  });
}

function Home() {
  // função para filtrar Pokémon conforme o input
  function filtrar(event) {
    const termo = event.target.value.toLowerCase();
    const filtrados = allPokemons.filter(p => p.name.toLowerCase().includes(termo));
    exibirPokemons(filtrados);
  }

  // carrega os Pokémon quando o componente é montado
  setTimeout(() => carregarPokemons(), 0);

  return (
    <>
      <Header onSearchChange={filtrar} />
      <Main>
        <ul id="pokemonList"></ul>
      </Main>
      <Footer />
    </>
  );
}


export default Home;