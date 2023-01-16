let pokemonList = document.getElementById('pokemon-list');
let loadMoreButton = document.getElementById('loadMore');
let offset = 0;
const limit = 20;
const maxRecords = 251;

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

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordNextPage = offset + limit;
    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        LoadMorePokemons(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        LoadMorePokemons(offset, limit);
    }
});