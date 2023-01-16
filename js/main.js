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
};

PokeApi.getPokemons().then((pokemons = []) => {
    const newList = pokemons.map(pokemonConverterLi).join('');
    pokemonList.innerHTML += newList;
});