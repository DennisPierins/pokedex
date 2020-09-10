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

// Displays all pokemon with their respected heights; pokemon with heights higher than 1 display an extra message
for (let i = 0; i < pokemonList.length; i++){
  if (pokemonList[i].height > 1){
    document.write(pokemonList[i].name + " " + "(height: " + pokemonList[i].height + ")" + " - Wow, that's big!" + "<br>" + "<br>")
} else {document.write(pokemonList[i].name + " " + "(height: " + pokemonList[i].height + ")" + "<br>" + "<br>")
}
}
