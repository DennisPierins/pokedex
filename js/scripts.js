let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modal-container');

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  // Creates a list with buttons
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemonlist");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    // Makes the buttons clickable and shows the pokemon's modal
    button.addEventListener('click', function (event) {
      showDetails(pokemon)
    })
  }

  // Shows the pokemon's details in a modal
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      showModal(pokemon)
    });
  }

  // Fetches information from the API
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  // Fetches pokemon details from the API
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  // Creates a modal
  function showModal(text) {
      modalContainer.innerHTML = '';
      let modal = document.createElement('div');
      modal.classList.add('modal');

      // Close button for the modal
      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      closeButtonElement.addEventListener('click', hideModal);

      // Title of the modal
      let titleElement = document.createElement('h1');
      titleElement.innerText = text.name;

      // Content of the modal
      let contentElement = document.createElement('p');
      contentElement.innerText = 'Height: ' + text.height;

      // Image of the modal
      let imageElement = document.createElement('img');
      imageElement.src = text.imageUrl;

      // Appending closing button, title, content and image to the modal + appends modal to modalContainer
      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(contentElement);
      modal.appendChild(imageElement);
      modalContainer.appendChild(modal);

      modalContainer.classList.add('is-visible');
    }

    function hideModal() {
      modalContainer.classList.remove('is-visible');
    }

    // Hides modal when pressing escape-button
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
      }
    });
    modalContainer.addEventListener('click', (e) => {
      // Hides modal when clicking outside of it
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

//Calls a function that displays a list with buttons for each pokemon name
pokemonRepository.loadList(). then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
