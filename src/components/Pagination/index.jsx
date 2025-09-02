function Pagination({ currentPage, totalPokemons, pokemonsPerPage, onNext, onPrev, onLast }) {
    const totalPages = Math.ceil(totalPokemons / pokemonsPerPage);

    return (
        <>
            <p>
                Página {currentPage} de {totalPages} ({totalPokemons} Pokémons)
            </p>

            <>
                <button onClick={onPrev} disabled={currentPage === 1}>
                    Anterior
                </button>
                <button onClick={onNext} disabled={currentPage === totalPages}>
                    Próxima
                </button>
                <button onClick={onLast} disabled={currentPage === totalPages}>
                    Última Tela
                </button>
            </>
        </>
    );
}


export default Pagination;