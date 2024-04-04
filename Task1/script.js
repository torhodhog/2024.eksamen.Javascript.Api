//Her fikk jeg hjelp av min venn internett til å finne passende farger for typene Pokemons. 
const typeColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

// Fetch the Pokemon
async function fetchPokemon() {
  let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
  let data = await response.json();
  let container = document.getElementById("pokemon-container");
  let types = new Set();

  for (let pokemon of data.results) {
    let response = await fetch(pokemon.url);
    let pokeData = await response.json();

    // Lager div-elementer for hvert pokemon-kort
    let div = document.createElement("div");
    div.className = "pokemon-card";
    div.style.backgroundColor = typeColors[pokeData.types[0].type.name]; //Setter bakgrunnsfarge basert på første type.
    let img = document.createElement("img");
    img.src = pokeData.sprites.front_default;
    let h2 = document.createElement("h2");
    h2.textContent = pokeData.name;
    let p = document.createElement("p");
    let pokemonTypes = [pokeData.types[0].type.name];
    p.textContent = pokemonTypes.join(", ");
    pokemonTypes.forEach((type) => types.add(type));
   
//THE BUTTONS

//Lagre pokemons knappen. 
let buttonSave = document.createElement('button');
buttonSave.textContent = 'Lagre';
buttonSave.className = 'save'; // Add a class to the button
buttonSave.addEventListener('click', function() {
  let favoritesContainer = document.getElementById('saved-pokemons-container');
  let li = document.createElement('li');
  let clone = div.cloneNode(true); // Clone the card

  // Fjerner knappene lagre, rediger, og slett
  let buttons = clone.querySelectorAll('button');
  buttons.forEach(button => clone.removeChild(button));

// Legger til en fjern for å kunne ta de vekk fra listen
let buttonRemove = document.createElement('button');
buttonRemove.textContent = 'Fjern';
buttonRemove.addEventListener('click', function() {
   favoritesContainer.removeChild(li); // Remove the card from the favorites list

   // Fjern-knappen fjerner også fra localStorage
   let favoritePokemons = JSON.parse(localStorage.getItem('favoritePokemons')) || [];
   let index = favoritePokemons.findIndex(pokemon => pokemon.name === h2.textContent);
   if (index !== -1) {
      favoritePokemons.splice(index, 1);
      localStorage.setItem('favoritePokemons', JSON.stringify(favoritePokemons));
   }
});
clone.appendChild(buttonRemove);
  

  // Her sjekker vi om det er plass til flere pokemons i listen. Mer enn 5 pokemons er ikke tillatt.
  let favoritePokemons = JSON.parse(localStorage.getItem('favoritePokemons')) || [];
  let existingPokemon = favoritePokemons.find(pokemon => pokemon.name === pokeData.name);
  if (existingPokemon) {
    alert('Denne Pokémonen er allerede i favorittlisten din.');
    return;
  }

  // Add the Pokemon to the favorites list
  if (favoritesContainer.getElementsByTagName('li').length < 5) { // Limit of 5 pokemons
    li.appendChild(clone);
    favoritesContainer.appendChild(li);
    favoritePokemons.push({ name: pokeData.name, type: pokeData.types[0].type.name });
    localStorage.setItem('favoritePokemons', JSON.stringify(favoritePokemons));
  } else {
    alert('Du kan bare lagre opptil 5 pokemons i favorittlisten din.');
  }
});

//Slett knappen
let buttonDelete = document.createElement("button");
buttonDelete.textContent = "Slett";

//Rediger knappen
let buttonEdit = document.createElement("button");
buttonEdit.textContent = "Rediger";
buttonEdit.addEventListener('click', function() {
   let newName = prompt('Skriv inn det nye navnet for Pokemonen:');
   let newType = prompt('Skriv inn den nye typen for Pokemonen:');
   if (newName) {
     h2.textContent = newName;
     p.textContent = newType;
   }
 });


    div.dataset.types = pokemonTypes.join(", "); // I tilfelle flere typer, skilles de med et komma.
    // Legger til bilde, knapper og tekst til div-elementet
    div.appendChild(img);
    div.appendChild(h2);
    div.appendChild(p);
    div.appendChild(buttonSave);
    div.appendChild(buttonDelete);
    div.appendChild(buttonEdit);
    // Samler alle div-elementene i containeren
    container.appendChild(div);
  }

  async function fetchAllTypes() {
    let response = await fetch("https://pokeapi.co/api/v2/type?limit=18"); // Fetcher API på nytt for å finne alle typpene, ikke kun de som vises fra første fetch.
    let data = await response.json();
    let select = document.getElementById("type-filter");
   data.results.forEach((type) => {
      if (type.name  && type.name ) {
         let option = document.createElement("option");
         option.value = type.name;
         option.textContent = type.name;
         
         select.appendChild(option);
      }
   });
    select.addEventListener("change", function () {
      let selectedType = this.value;
      let allPokemonCards = document.querySelectorAll(".pokemon-card");
      allPokemonCards.forEach((card) => {
        let cardTypes = card.dataset.types.split(", ");
        if (selectedType && !cardTypes.includes(selectedType)) {
          card.style.display = "none";
        } else {
          card.style.display = "block";
        }
      });
    });
  }

  fetchAllTypes().catch((error) =>
    console.error("Det oppstod en feil:", error)
  );
}

fetchPokemon().catch((error) => console.error("Det oppstod en feil:", error));
