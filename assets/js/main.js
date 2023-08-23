const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const filterPokemon = document.getElementById('pokemonType')
    
const maxRecords = 151
const limit = 10
let offset = 0;
let pokemons = []

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function getFilteredPokemons(pokemons) {
    return pokemons.filter((pokemon) => pokemon.type == filterPokemon.value)
}

async function getPokemonItens(offset, limit) {
    return pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        return pokemons
            // const newHtml = pokemons.map(convertPokemonToLi).join('')
            // pokemonList.innerHTML += newHtml
    })
}

async function loadPokemonInHtml(pokemons) {
    pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('')
}

async function addMorePokemonInList() {
    offset += limit
        const qtdRecordsWithNexPage = offset + limit
    
        if (qtdRecordsWithNexPage >= maxRecords) {
            const newLimit = maxRecords - offset
            const getPokemons = await getPokemonItens(offset, newLimit)
            getPokemons.forEach((pokemon) => pokemons.push(pokemon))
            loadPokemonInHtml(pokemons)

            loadMoreButton.parentElement.removeChild(loadMoreButton)
        } else {
            const getPokemons = await getPokemonItens(offset, limit)
            getPokemons.forEach((pokemon) => pokemons.push(pokemon))

            loadPokemonInHtml(pokemons)
        }
}

filterPokemon.addEventListener('change', function () {
    window.location.search
    if (filterPokemon.value != 'all') {
        pokemonList.innerHTML = ''
        loadPokemonInHtml(getFilteredPokemons(pokemons))
    } else {
        pokemonList.innerHTML = ''
        loadPokemonInHtml(pokemons)
    }
})

window.onload = async () => {
    pokemons = await getPokemonItens(offset, limit)
    
    loadMoreButton.addEventListener('click', async () => {
        addMorePokemonInList()
        pokemonList.innerHTML = ''
    })
    loadPokemonInHtml(pokemons)
}