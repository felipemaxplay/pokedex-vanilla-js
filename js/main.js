let pokemonList = document.getElementById('pokemon-list');
let loadMoreButton = document.getElementById('loadMore');
let pokemonMain = document.getElementById("pokemon-main-details");
let offset = 0;
const limit = 20;
const maxRecords = 251;

function loadPokemon() {
    let pokemonLI = document.querySelectorAll(".pokemon");
    pokemonLI.forEach((li) => {
        li.addEventListener('click', () => {
            const pokemonName = li.getElementsByTagName("span")[1].innerHTML;
            const isVisible = pokemonMain.style.visibility;
            if (isVisible === 'hidden') {
                PokeApi.getPokemon(pokemonName).then((pokemon) => {
                    const htmlPkmn = `
                        <div class="pokemon-info">
                            <span class="pokemon-name">${pokemon.name}</span>
                            <span class="pokemon-number">#${pokemon.order}</span>
                            <ol class="pokemon-types">
                                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                            </ol>
                        </div>
                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                        <div class="pokemon-base-stats">
                            <label class="pokemon-stats-name" for="hp">HP: ${pokemon.hp}</label>
                            <progress class="pokemon-stats" value="${pokemon.hp}" max="255">${pokemon.hp}</progress>
                            <label class="pokemon-stats-name" for="attack">Attack: ${pokemon.attack}</label>
                            <progress class="pokemon-stats" value="${pokemon.attack}" max="255"></progress>
                            <label class="pokemon-stats-name" for="defense">Defense: ${pokemon.defense}</label>
                            <progress class="pokemon-stats" value="${pokemon.defense}" max="255"></progress>
                            <label class="pokemon-stats-name" for="special-attack">Special Attack: ${pokemon.specialAttack}</label>
                            <progress class="pokemon-stats" value="${pokemon.specialAttack}" max="255"></progress>
                            <label class="pokemon-stats-name" for="special-defense">Special Defense: ${pokemon.specialDefense}</label>
                            <progress class="pokemon-stats" value="${pokemon.specialDefense}" max="255"></progress>
                            <label class="pokemon-stats-name" for="speed">Speed: ${pokemon.speed}</label>
                            <progress class="pokemon-stats" value="${pokemon.speed}" max="255"></progress>
                        </div>
                        `
                    pokemonMain.classList.add(pokemon.primaryType);
                    pokemonMain.innerHTML = htmlPkmn;
                    pokemonMain.style.visibility = "visible";
                });
            } else {
                pokemonMain.className = '';
                pokemonMain.style.visibility = "hidden";
            }
        });
    })
}

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
        loadPokemon();
    });
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