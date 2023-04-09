console.log("hi");

let generateBtn = document.querySelector("#generate-pokemon");
generateBtn.addEventListener("click", renderEverything);

function renderEverything() {
  let allPokemonContainer = document.querySelector("#poke-container");
  allPokemonContainer.innerHTML = "";
  fetchPokemon();
}

function fetchPokemon() {
  //You ccan see this limit in the url, if you change this limit you can change the number of pokemons.
  //if you put limit = 5 it will only give 5 pokemons in return.
  fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then((response) => response.json())
    .then(function (allpokemon) {
      allpokemon.results.forEach(function (pokemon) {
        fetchPokemonData(pokemon);
      });
    });
}

function fetchPokemonData(pokemon) {
  let url = pokemon.url;
  //this url is basically another api call to the api which fetches more data of a specific pokemon.
  fetch(url)
    .then((response) => response.json())
    .then(function (pokeData) {
      //You might think why I am doing another fetch just to get pokemon id number.
      //But this is just a basic illustration, what if I needed to add more details about pokemon.
      //then I can use that url in order to find more details about that pokemon.
      renderPokemon(pokeData);
    });
}

function renderPokemon(pokeData) {
  let allPokemonContainer = document.getElementById("poke-container");
  let pokeContainer = document.createElement("div");

  //I am passing this the pokeContainer because i want to append the image in that container so
  createPokeImage(pokeData, pokeContainer);

  let pokeName = document.createElement("h4");
  pokeName.innerText = pokeData.name;

  let pokeNumber = document.createElement("p");
  pokeNumber.innerText = `#${pokeData.id}`;
  //appending name and if in the container, and the image is aleardy appened by calling in above function.
  pokeContainer.append(pokeName, pokeNumber);
  //appending the whole container in the all pokemons container.
  allPokemonContainer.appendChild(pokeContainer);
}

function createPokeImage(pokeData, containerDiv) {
  let pokeImage = document.createElement("img");
  pokeImage.classList.add("pokeImg");
  
//   As the website for pokemon image API is updated, it brings us a lot more data than before.
//   So, here we are fetching one type of pokemon images contained in .sprites key.
  let pokeImageURL = pokeData.sprites.other.dream_world.front_default; 
  PokeImage.alt = "Image Not Found";
  PokeImage.src = pokeImageURL;
  containerDiv.append(pokeImage);
}
//Some unrelated gyan:
// You might think that some of the things i have done here can be written much easily using a different api
//Well I know that, I just made this demo so I can show you how you can use multiple apis in a simple funciton.
//I just wanted you to see how you can make complex sites using just basic js.
//If you google enough you might a better api which gives image along with basic data of pokemon.
//Also  you can see that despite using these 60 lines of code , we made our site dynamic,
//We can simply change number of pokemons in the url and you would get more or less pokemons.
//We don't need to manually write bazillion lines of html and fill each url manually.
