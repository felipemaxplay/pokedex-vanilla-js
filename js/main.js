const offset = 0;
const limit = 20;
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

let pokemonList = document.getElementById('pokemon-list');

function pokemonConverterLi(pokemon) {
    return `
    <li class="pokemon">
        <span class="pokemon-number">#487</span>
        <span class="pokemon-name">${pokemon.name}</span>
        <div class="pokemon-details">
            <ol class="pokemon-types">
                <li class="type">Grass</li>
                <li class="type">Grass</li>
            </ol>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/387.png" alt="${pokemon.name}">
        </div>
    </li>`
}

PokeApi.getPokemons().then((pokemons) => {
    for (let i = 0; i < pokemons.length; i++) {
        const element = pokemons[i];
        let pokemon = pokemonConverterLi(element);
        pokemonList.innerHTML += pokemon
    }
});