//variáveis globais
const pokemonName = document.querySelector('.pokemon-name');
const pokemonNumber = document.querySelector('.pokemon-number');
const pokemonImage = document.querySelector('.pokemon-image');
const form = document.querySelector('.form');
const input = document.querySelector('.input-search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

//buscando os dados na API
const fetchPokemon =  async (pokemon) => { //colodando pokemon como parâmetro da função

    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    //await só pode ser usado em funções assincronas (async) quando a função for executada ela espera a resposta da API

    if (APIresponse.status === 200) {
      const data = await APIresponse.json(); //criando uma constante para extraír os dados em json da API

      return data
    }
};

//renderizando os dados recebidos
const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = ' '

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = 'block'
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']; //caminho percorrido até achar o gif dentro da API
    searchPokemon = data.id
  
    input.value = ''; //deixando o input vazio
  } else {
    pokemonImage.style.display = 'none'
    pokemonName.innerHTML = 'not found :('
    pokemonNumber.innterHTML = ' '
  }
}

//pegando o que for pesquisado e busca na API
form.addEventListener('submit', (event) => {
  event.preventDefault();

  renderPokemon(input.value.toLowerCase()); //usando a função de rederizar os dados com o que é buscado no input

})

//botões
buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
  searchPokemon -= 1;
  renderPokemon(searchPokemon)
}});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon)
});

renderPokemon(searchPokemon);







