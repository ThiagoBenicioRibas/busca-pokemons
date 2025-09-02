import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Main from '../../components/Main';
import Footer from '../../components/Footer';
import PokemonCard from '../../components/ui/pokemonCard';
import Pagination from '../../components/Pagination';

import { getPokemonList, getPokemonDetails } from '../../services/pokemonService';


const POKEMONS_PER_PAGE = 20;

function Home() {
    const [pokemons, setPokemons] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPokemons, setTotalPokemons] = useState(0);


    useEffect(() => {
        async function loadPokemonsByPage() {
            setIsLoading(true);
            try {

                const offset = (currentPage - 1) * POKEMONS_PER_PAGE;
                const { results, count } = await getPokemonList(POKEMONS_PER_PAGE, offset);
                setTotalPokemons(count);

                const detailedList = await Promise.all(
                    results.map(item => getPokemonDetails(item.url))
                );
                setPokemons(detailedList);
            } catch (error) {
                console.error("Erro ao carregar os Pokémons:", error);
            } finally {
                setIsLoading(false);
            }
        }
        loadPokemonsByPage();
    }, [currentPage]);


    function handleSearchChange(event) {
        setSearchTerm(event.target.value);
    }

    async function handleSearchSubmit(event) {
        event.preventDefault();
        const value = searchTerm.toLowerCase();

        if (value.length > 0) {
            const { results } = await getPokemonList(2000, 0);
            const allDetailedList = await Promise.all(
                results.map(item => getPokemonDetails(item.url))
            );
            const filtered = allDetailedList.filter(p => p.name.toLowerCase().includes(value));
            setPokemons(filtered);
            setTotalPokemons(filtered.length);
        } else {

            setCurrentPage(1);
        }
    }


    const handleNextPage = () => setCurrentPage(prev => prev + 1);
    const handlePrevPage = () => setCurrentPage(prev => Math.max(1, prev - 1));
    const handleLastPage = () => setCurrentPage(Math.ceil(totalPokemons / POKEMONS_PER_PAGE));

    return (
        <>
            <Header
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                onSearchSubmit={handleSearchSubmit}
            />
            <Main>
                {isLoading ? (
                    <p>Carregando Pokémons...</p>
                ) : (
                    <>
                        <ul id="pokemonList">
                            {pokemons.map(p => (
                                <PokemonCard key={p.id} pokemon={p} />
                            ))}
                        </ul>
                        <Pagination
                            currentPage={currentPage}
                            totalPokemons={totalPokemons}
                            pokemonsPerPage={POKEMONS_PER_PAGE}
                            onNext={handleNextPage}
                            onPrev={handlePrevPage}
                            onLast={handleLastPage}
                        />
                    </>
                )}
            </Main>
            <Footer />
        </>
    );
}


export default Home;