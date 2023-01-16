let pokemonList = document.getElementById('pokemon-list');

function pokemonConvertTypesLi(pokemonTypes) {
    let types = pokemonTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`)
    return types;
}

function pokemonConverterLi(pokemon) {
    return `
    <li class="pokemon">
        <span class="pokemon-number">#${pokemon.id}</span>
        <span class="pokemon-name">${pokemon.name}</span>
        <div class="pokemon-details">
            <ol class="pokemon-types">
                ${pokemonConvertTypesLi(pokemon.types).join('')}
            </ol>
            <img src="${pokemon.sprites.other.home.front_default}" alt="${pokemon.name}">
        </div>
    </li>`
};

PokeApi.getPokemons().then((pokemons = []) => {
    const newList = pokemons.map(pokemonConverterLi).join('');
    pokemonList.innerHTML = newList;
});