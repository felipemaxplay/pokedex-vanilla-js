const PokeApi = {
    getPokemonsDetails: (pokemon) => {
        return fetch(pokemon.url)
            .then((response) => response.json())
            .then(pokemonConvertPokeAPIToClass)
            .catch((error) => console.log(error));
    },
    getPokemons: (offset = 0, limit = 20) => {
        const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
        return fetch(url)
            .then((response) => response.json())
            .then((jsonBody) => jsonBody.results)
            .then((pokemons) => pokemons.map(PokeApi.getPokemonsDetails))
            .then((detailsRequests) => Promise.all(detailsRequests))
            .then((pokemonDetails) => pokemonDetails)
            .catch((error) => console.log(error));
    }
}

function pokemonConvertPokeAPIToClass(pokeDetails) {
    const pokemon = new Pokemon();
    pokemon.order = pokeDetails.order;
    pokemon.name = pokeDetails.name;
    const types = pokeDetails.types.map((typeslot) => typeslot.type.name);
    const [type] = types;
    pokemon.primaryType = type;
    pokemon.types = types;
    pokemon.photo = pokeDetails.sprites.other.home.front_default;

    return pokemon;
}