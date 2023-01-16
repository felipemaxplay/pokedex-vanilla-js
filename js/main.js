let pokemonList = document.getElementById('pokemon-list');
let LoadMoreButton = document.getElementById('loadMore');
const limit = 20;
let offset = 0;

function LoadMorePokemons(offset, limit) {
    PokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.primaryType}">
            <span class="pokemon-number">#${pokemon.order}</span>
            <span class="pokemon-name">${pokemon.name}</span>
            <div class="pokemon-details">
                <ol class="pokemon-types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>`).join('');
        pokemonList.innerHTML += newHtml;
    })
};

LoadMorePokemons(offset, limit);

LoadMoreButton.addEventListener('click', () => {
    offset += limit;
    LoadMorePokemons(offset, limit);
});