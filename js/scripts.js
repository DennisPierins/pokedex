let pokemonRepository = (function () {
  let pokemonList = [
  {
    name: 'Bulbasaur',
    height: 0.7,
    type: ['Grass', 'Poison']
  },
  {
    name: 'Ivysaur',
    height: 1,
    type: ['Grass', 'Poison']
  },
  {
    name: 'Venusaur',
    height: 2,
    type: ['Grass', 'Poison']
  }
];

function add(pokemon) {
  pokemonList.push(pokemon);
}

function getAll() {
  return pokemonList;
}

//Creates a list with buttons
function addListItem(pokemon) {
  let pokemonList = document.querySelector(".pokemonlist");
  let listItem = document.createElement("li");
  let button = document.createElement("button");
  button.innerText = pokemon.name;
  button.classList.add("button-class");
  listItem.appendChild(button);
  pokemonList.appendChild(listItem);
//Makes the buttons clickable and shows the pokemon's name in console
  button.addEventListener('click', function (event) {
    showDetails(pokemon)
  })
}

//Shows the pokemon's name in console
function showDetails(pokemon) {
  console.log(pokemon.name)
}

return {
  add: add,
  getAll: getAll,
  addListItem: addListItem,
  showDetails: showDetails
};
})();

//Calls a function that displays a list with buttons for each pokemon name
pokemonRepository.getAll().forEach(function(pokemon){
  pokemonRepository.addListItem(pokemon);
});
