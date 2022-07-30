const pokemonNome = document.querySelector('.pokemon__nome');
const pokemonNumero = document.querySelector('.pokemon__numero');
const pokemonImagem = document.querySelector('.pokemon__imagem');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonAnterior = document.querySelector('.btn-anterior');
const buttonProximo = document.querySelector('.btn-proximo');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {

  pokemonNome.innerHTML = 'Carregando...';
  pokemonNumero.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImagem.style.display = 'block';
    pokemonNome.innerHTML = data.name;
    pokemonNumero.innerHTML = data.id;
    pokemonImagem.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data.id;
  } else {
    pokemonImagem.style.display = 'none';
    pokemonNome.innerHTML = 'Pokémon não encontrado';
    pokemonNumero.innerHTML = '';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonAnterior.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonProximo.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
