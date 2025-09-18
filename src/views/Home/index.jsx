import './style.css';
import PokemonCard from '../../components/PokemonCard';
import Pagination from '../../components/Pagination';
import AriaLive from '../../ui/AriaLive';
import Layout from '../../layout';
import { pegarPokemons } from '../../services/pokemonService.js';
import { useEffect, useState, useRef } from 'react';

function Home() {
  const [pokemons, definirPokemons] = useState([]);
  const [proximo, definirProximo] = useState(null);
  const [anterior, definirAnterior] = useState(null);
  const [quantidade, definirQuantidade] = useState(null);
  const [termoBusca, setTermoBusca] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [exibirResultadoBusca, setExibirResultadoBusca] = useState(false);
  const listaRef = useRef(null);
  const h2BuscaRef = useRef(null);

  useEffect(() => {
    carregarPokemons(0);
  }, []);

  const fornecerFeedback = (texto) => setMensagem(texto);

  async function carregarPokemons(inicio = 0, url = null) {
    const resposta = await pegarPokemons(inicio, url);
    definirPokemons(resposta.details);
    definirProximo(resposta.next);
    definirAnterior(resposta.previous);
    definirQuantidade(resposta.count);
    fornecerFeedback(`Mostrando ${resposta.details.length} pokémons`);
    listaRef.current?.focus();
    setExibirResultadoBusca(false);
  }

  async function navegar(eProximo) {
    await carregarPokemons(0, eProximo ? proximo : anterior);
  }

  async function navegarPrimeiraOuUltima(destino) {
    const url =
      destino === 'primeira'
        ? null
        : 'https://pokeapi.co/api/v2/pokemon?offset=1282&limit=20';
    await carregarPokemons(0, url);
  }

  async function buscarPokemonPorNome(nome) {
    try {
      const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`);
      if (!resposta.ok) throw new Error('Não encontrado');
      const dados = await resposta.json();
      const pokemonFormatado = {
        id: dados.id,
        nome: dados.name,
        peso: dados.weight,
        imagem:
          dados.id > 930
            ? dados.sprites.front_default
            : `https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/other/showdown/${dados.id}.gif`,
      };
      definirPokemons([pokemonFormatado]);
      fornecerFeedback(`Pokémon ${dados.name} encontrado!`);
      setExibirResultadoBusca(true);
      h2BuscaRef.current?.focus();
    } catch (error) {
      definirPokemons([]);
      fornecerFeedback('Nenhum Pokémon encontrado com esse nome.');
      setExibirResultadoBusca(true);
      h2BuscaRef.current?.focus();
    }
  }

  return (
    <Layout
      termoBusca={termoBusca}
      aoMudarBusca={(e) => setTermoBusca(e.target.value)}
      onSearch={buscarPokemonPorNome}
    >
      <AriaLive mensagem={mensagem} />

      {!exibirResultadoBusca && <h2>Pokémons carregados</h2>}

      {exibirResultadoBusca && (
        <h2 tabIndex={-1} ref={h2BuscaRef}>
          Resultado da busca
        </h2>
      )}

      <div className="home-pokemons" tabIndex={-1} ref={listaRef}>
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            nome={pokemon.nome}
            imagem={pokemon.imagem}
            peso={pokemon.peso}
          />
        ))}
      </div>

      <Pagination
        navegar={navegar}
        navegarPrimeiraOuUltima={navegarPrimeiraOuUltima}
        fornecerFeedback={fornecerFeedback}
      />
    </Layout>
  );
}

export default Home;
