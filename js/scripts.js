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

return {
  add: add,
  getAll: getAll
};
})();

// Displays all pokemon with their respected heights & types - Pokemon with a height higher than 1 will receive an extra message
pokemonRepository.getAll().forEach(function(pokemon) {
  if(pokemon.height > 1){
    document.write('<p>' + pokemon.name + ' ' + '(height: ' + pokemon.height + ') - Type: ' + pokemon.type + ' - Wow, that\'s big!' + '</p>');
  }else{
    document.write('<p>' + pokemon.name + ' ' + '(height: ' + pokemon.height + ') - Type: ' + pokemon.type + '</p>');
  }
});
