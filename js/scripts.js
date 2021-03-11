let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  // Creates a list with buttons
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemonlist');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn', 'btn-secondary', 'btn-block');
    button.setAttribute('data-target', '#pokedexmodal');
    button.setAttribute('data-toggle', 'modal');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    // Makes the buttons clickable and shows the pokemon's modal
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  // Shows the pokemon's details in a modal
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  // Fetches information from the API
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // Fetches pokemon details from the API
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Now we add the details to the item
        // item.imageUrl = details.sprites.front_default;
        item.imageUrl = details.sprites.other.dream_world.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = [];
        for (let i = 0; i < details.types.length; i++) {
          item.types.push(' ' + details.types[i].type.name);
        }
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // Creates a modal
  function showModal(text) {
    // Define title and body of modal
    let modalTitle = document.querySelector('.modal-title');
    modalTitle.innerText = text.name;

    let modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = '';

    // Define image & height elements of pokemon for modal
    let imageElement = document.createElement('img');
    imageElement.src = text.imageUrl;

    let heightElement = document.createElement('p');
    heightElement.innerText = 'Height: ' + text.height;

    let weightElement = document.createElement('p');
    weightElement.innerText = 'Weight: ' + text.weight;

    let typesElement = document.createElement('p');
    typesElement.innerText = 'Types: ' + text.types;

    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal
  };
})();

//Calls a function that displays a list with buttons for each pokemon name
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
