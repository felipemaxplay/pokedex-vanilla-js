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
    },
    getPokemon: (pokemonName) => {
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
        let fetchUrl = fetch(url)
            .then((response) => response.json())
            .then(pokemonConvertPokeAPIToClass)
            .then((pokemonClass) => pokemonClass)
            .catch((erro) => console.log(erro));
            return fetchUrl;
    }
}

function pokemonConvertPokeAPIToClass(pokeDetails) {
    const pokemon = new Pokemon();
    pokemon.order = pokeDetails.id;
    pokemon.name = pokeDetails.name;
    const types = pokeDetails.types.map((typeslot) => typeslot.type.name);
    const [type] = types;
    pokemon.primaryType = type;
    pokemon.types = types;
    pokemon.photo = pokeDetails.sprites.other.home.front_default;
    pokemon.hp = pokeDetails.stats[0].base_stat;
    pokemon.attack = pokeDetails.stats[1].base_stat;
    pokemon.defense = pokeDetails.stats[2].base_stat;
    pokemon.specialAttack = pokeDetails.stats[3].base_stat;
    pokemon.specialDefense = pokeDetails.stats[4].base_stat;
    pokemon.speed = pokeDetails.stats[5].base_stat;
    return pokemon;
}