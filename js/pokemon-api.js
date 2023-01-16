const PokeApi = {
    getPokemonsDetails: (pokemon) => {
        return fetch(pokemon.url)
            .then((response) => response.json())
            .catch((error) => console.log(error))
    },
    getPokemons: (offset = 0, limit = 20) => {
        const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
        return fetch(url)
            .then((response) => response.json())
            .then((jsonBody) => jsonBody.results)
            .then((pokemons) => pokemons.map(PokeApi.getPokemonsDetails))
            .then((detailsRequests) => Promise.all(detailsRequests))
            .then((pokemonDetails) => pokemonDetails)
            .catch((error) => console.log(error))
    }
}