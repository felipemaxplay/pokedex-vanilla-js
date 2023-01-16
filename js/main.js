let pokemonList = document.getElementById('pokemon-list');

function pokemonConverterLi(pokemon) {
    return `
    <li class="pokemon ${pokemon.primaryType}">
        <span class="pokemon-number">#${pokemon.order}</span>
        <span class="pokemon-name">${pokemon.name}</span>
        <div class="pokemon-details">
            <ol class="pokemon-types">
                ${pokemon.types.map((type) => `<li class="type">${type}</li>`).join('')}
            </ol>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
    </li>`
};

PokeApi.getPokemons().then((pokemons = []) => {
    const newList = pokemons.map(pokemonConverterLi).join('');
    pokemonList.innerHTML = newList;
});