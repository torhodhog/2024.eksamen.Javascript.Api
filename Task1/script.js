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

// Fetch de 50 første Pokemon fra APIet og legger de i en container.
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


    //Knappene for lagre, rediger og slett

    //Lagre pokemons knappen.
    let buttonSave = document.createElement("button");
    buttonSave.textContent = "Lagre";
    buttonSave.addEventListener("click", function () {
      let favoritesContainer = document.getElementById(
        "saved-pokemons-container"
      );
      let li = document.createElement("li");
      let clone = div.cloneNode(true); // REFERANSE https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode

      // Fjerner knappene lagre, rediger, og slett
      let buttons = clone.querySelectorAll("button");
      buttons.forEach((button) => clone.removeChild(button));

      // Legger til en fjern for å kunne ta de vekk fra listen
      let buttonRemove = document.createElement("button");
      buttonRemove.textContent = "Fjern";
      buttonRemove.addEventListener("click", function () {
        favoritesContainer.removeChild(li); // Fjerner elementet fra listen.

        let favoritePokemons =
          JSON.parse(localStorage.getItem("favoritePokemons")) || [];
        let pokemonIndex = favoritePokemons.findIndex(
          (pokemon) => pokemon.name === originalName
        );
        if (pokemonIndex !== -1) {
          favoritePokemons[pokemonIndex] = { name: newName, type: newType };
          localStorage.setItem(
            "favoritePokemons",
            JSON.stringify(favoritePokemons)
          );
        }

        if (pokemonIndex !== -1) {
          favoritePokemons[pokemonIndex] = { name: newName, type: newType };
          localStorage.setItem(
            "favoritePokemons",
            JSON.stringify(favoritePokemons)
          );
        }
      });
      clone.appendChild(buttonRemove);
      // REFERANSE https://developer.mozilla.org/en-US/docs/Web/API/Response/clone


      
      // Her sjekker jeg om det allerede er en pokemon med samme navn i listen og om det er  plass til flere pokemons i listen. Mer enn 5 pokemons er ikke tillatt.
      let favoritePokemons =
        JSON.parse(localStorage.getItem("favoritePokemons")) || [];
      let existingPokemon = favoritePokemons.find(
        (pokemon) => pokemon.name === pokeData.name
      );
      if (existingPokemon) {
        alert("Denne Pokémonen er allerede i favorittlisten din.");
        return;
      }

      // Legger til pokemon i favorittlisten
      if (favoritePokemons.length < 5) {
        // så lenge det er mindre enn 5 pokemons i listen, kan du legge til flere.
        li.appendChild(clone);
        favoritesContainer.appendChild(li);
        favoritePokemons.push({
          name: pokeData.name,
          type: pokeData.types[0].type.name,
          imageUrl: pokeData.sprites.front_default,
        });
        localStorage.setItem(
          "favoritePokemons",
          JSON.stringify(favoritePokemons)
        );
      } else {
        alert("Du kan bare lagre opptil 5 pokemons i favorittlisten din.");
      }
    });

    //Slett knappen
    let buttonDelete = document.createElement("button");
    buttonDelete.textContent = "Slett";
    buttonDelete.addEventListener("click", function () {
      container.removeChild(div);

      // Sjekk om Pokemonen også er i favorittlisten
      let favoritePokemons =
        JSON.parse(localStorage.getItem("favoritePokemons")) || [];
      let index = favoritePokemons.findIndex(
        (pokemon) => pokemon.name === h2.textContent
      );
      if (index !== -1) {
        // Fjern Pokemonen fra favorittlisten og oppdater localStorage
        favoritePokemons.splice(index, 1);
        localStorage.setItem(
          "favoritePokemons",
          JSON.stringify(favoritePokemons)
        );
      }
    });

    // Rediger-knappen
    let buttonEdit = document.createElement("button");
    buttonEdit.textContent = "Rediger";
    buttonEdit.addEventListener("click", function () {
      let originalName = h2.textContent;
      let newName = prompt("Skriv inn det nye navnet for Pokémonen:");
      let newType = prompt("Skriv inn den nye typen for Pokémonen:");
      if (newName && newType) {
        h2.textContent = newName;
        p.textContent = newType;
        div.style.backgroundColor = typeColors[newType];

        let favoritePokemons =
          JSON.parse(localStorage.getItem("favoritePokemons")) || [];
        let pokemonIndex = favoritePokemons.findIndex(
          (pokemon) => pokemon.name === originalName
        );
        if (pokemonIndex !== -1) {
          favoritePokemons[pokemonIndex] = { name: newName, type: newType };
          localStorage.setItem(
            "favoritePokemons",
            JSON.stringify(favoritePokemons)
          );
        }
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

  //LOGIKK FOR Å LAGE EGEN POKEMON

  let createPokemonButton = document.getElementById("create-pokemon");

  // Lager en eventListener som lytter etter klikk på knappen
  createPokemonButton.addEventListener("click", function () {
    // Prompt the user for the name and type of the new Pokemon
    let name = prompt("Skriv inn navnet på den nye Pokemonen:");
    let type = prompt("Skriv inn typen til den nye Pokemonen:");

    // Lager et nytt kort, med informasjonen som brukeren har skrevet inn
    let div = document.createElement("div");
    div.className = "pokemon-card";
    div.style.backgroundColor = typeColors[type]; // Dette setter riktig farge basert på typen som er skrevet inn.
    let img = document.createElement("img");
    img.src = "assets/default-image.png"; // Laget meg en pokemon.
    img.style.width = "96px"; // Samme bredde som de andre
    img.style.height = "96px"; // samme høyde som de andre
    let h2 = document.createElement("h2");
    h2.textContent = name;
    let p = document.createElement("p");
    p.textContent = type;
    div.dataset.types = type; // REFERANSE https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset

    // Legger til bildet og teksten til div-elementet
    div.appendChild(img);
    div.appendChild(h2);
    div.appendChild(p);

    // Legger kortet inn sammen med de andre kortene
    let container = document.getElementById("pokemon-container");

    // Legger til knappene
    let buttonSaveCustom = document.createElement("button");
    buttonSaveCustom.textContent = "Lagre";
    buttonSaveCustom.className = "save";
    buttonSaveCustom.addEventListener("click", function () {
      let favoritesContainer = document.getElementById(
        "saved-pokemons-container"
      );
      let li = document.createElement("li");
      let clone = div.cloneNode(true); // Kloner div-elementet

      // Fjerner knappene lagre, rediger, og slett fra klonen
      let buttons = clone.querySelectorAll("button");
      buttons.forEach((button) => clone.removeChild(button));

      // Legger til en fjern-knapp for å kunne ta den vekk fra listen
      let buttonRemove = document.createElement("button");
      buttonRemove.textContent = "Fjern";
      buttonRemove.addEventListener("click", function () {
        removePokemonFromFavorites(li, favoritesContainer, h2);
      });

      clone.appendChild(buttonRemove);

      // Legger til pokemon i favorittlisten
      li.appendChild(clone);
      favoritesContainer.appendChild(li);

      // Lagrer den nye Pokemonen i localStorage
      let favoritePokemons =
        JSON.parse(localStorage.getItem("favoritePokemons")) || [];
      favoritePokemons.push({ name: h2.textContent, type: p.textContent });
      localStorage.setItem(
        "favoritePokemons",
        JSON.stringify(favoritePokemons)
      );
    });

    let buttonDeleteCustom = document.createElement("button");
    buttonDeleteCustom.textContent = "Slett";
    buttonDeleteCustom.addEventListener("click", function () {
      container.removeChild(div);

      // Sjekker om Pokemonen også er i localStorage
      let createdPokemons =
        JSON.parse(localStorage.getItem("createdPokemons")) || [];
      let index = createdPokemons.findIndex(function (pokemon) {
        return pokemon.name === h2.textContent;
      });
      if (index !== -1) {
        // Fjern Pokemonen fra localStorage og oppdater det
        createdPokemons.splice(index, 1);
        localStorage.setItem(
          "createdPokemons",
          JSON.stringify(createdPokemons)
        ); // sletter også fra localStorage
      }
    });

    let buttonEditCustom = document.createElement("button");
    buttonEditCustom.textContent = "Rediger";
    buttonEditCustom.addEventListener("click", function () {
      let newName = prompt("Skriv inn det nye navnet for Pokemonen:");
      let newType = prompt("Skriv inn den nye typen for Pokemonen:");
      if (newName) {
        h2.textContent = newName;
        p.textContent = newType.toLowerCase;
        div.style.backgroundColor = typeColors[newType]; // Endre bakgrunnsfargen basert på den nye typen
      }
    });

    div.appendChild(buttonSaveCustom);
    div.appendChild(buttonDeleteCustom);
    div.appendChild(buttonEditCustom);

    container.prepend(div); // REFERANSE https://developer.mozilla.org/en-US/docs/Web/API/Element/prepend for å få lagt nye pokemons øverst i listen!

    // Lagrer den nye Pokemonen i localStorage
    let createdPokemons =
      JSON.parse(localStorage.getItem("createdPokemons")) || [];
    createdPokemons.push({ name: name, type: type });
    localStorage.setItem("createdPokemons", JSON.stringify(createdPokemons));
  });
}

// Henter ut de lagrede pokemonene fra localStorage. Dette er for å kunne vise de i front-end selv om siden blir oppdatert. 
let favoritePokemons =
  JSON.parse(localStorage.getItem("favoritePokemons")) || [];

let favoritesContainer = document.getElementById("saved-pokemons-container");

// Gå gjennom de lagrede pokemonene og vis dem i front-end
for (let pokemon of favoritePokemons) {
  let div = document.createElement("div");
  div.className = "pokemon-card";
  div.style.backgroundColor = typeColors[pokemon.type];
  let img = document.createElement("img");
  img.src = pokemon.imageUrl;
  div.appendChild(img);
  let h2 = document.createElement("h2");
  h2.textContent = pokemon.name;
  let p = document.createElement("p");
  p.textContent = pokemon.type;

  // Legger til en fjern-knapp for å kunne ta den vekk fra listen
  let buttonRemove = document.createElement("button");
  buttonRemove.textContent = "Fjern";
  buttonRemove.addEventListener("click", function () {
    favoritesContainer.removeChild(div);

    let index = favoritePokemons.findIndex(
      (favPokemon) => favPokemon.name === pokemon.name
    );
    if (index !== -1) {
      favoritePokemons.splice(index, 1);
      localStorage.setItem(
        "favoritePokemons",
        JSON.stringify(favoritePokemons)
      );
    }
  });

  div.appendChild(h2);
  div.appendChild(p);
  div.appendChild(buttonRemove);
  favoritesContainer.appendChild(div);
}

async function fetchAllTypes() {
  let response = await fetch("https://pokeapi.co/api/v2/type?limit=18"); // Fetcher API på nytt for å finne alle typpene, ikke kun de som vises fra første fetch. Setter limit på 18, selv om APIet har 20 typer.
  let data = await response.json();
  let select = document.getElementById("type-filter");
  data.results.forEach((type) => {
    if (type.name && type.name) {
      let option = document.createElement("option");
      option.value = type.name;
      option.textContent = type.name;

      select.appendChild(option);
    }
  });

  // For å filtrere på typene. Vis kun typer som er valgt i dropdownen. Gi alert hvis det ikke finnes noen pokemons av den valgte typen.
  select.addEventListener("change", function () {
    let selectedType = this.value;
    let allPokemonCards = document.querySelectorAll(".pokemon-card");
    let noPokemonOfType = true;

    allPokemonCards.forEach((card) => {
      let cardTypes = card.dataset.types.split(", ");
      if (selectedType && !cardTypes.includes(selectedType)) {
        card.style.display = "none";
      } else {
        card.style.display = "block";
        noPokemonOfType = false;
      }
    });

    if (noPokemonOfType) {
      alert("Ingen Pokémoner av denne typen.");
    }
  });
}


//Denne funksjonen fjerner fra både favorittlisten og fra localStorage.
function removePokemonFromFavorites(li, favoritesContainer, h2) {
  favoritesContainer.removeChild(li);

  let favoritePokemons = JSON.parse(localStorage.getItem("favoritePokemons")) || [];
  let index = favoritePokemons.findIndex(function(pokemon) {
    return pokemon.name === h2.textContent;
  });
  if (index !== -1) {
    favoritePokemons.splice(index, 1);
    localStorage.setItem("favoritePokemons", JSON.stringify(favoritePokemons));

  }
}

window.onload = function () {
  fetchPokemon().catch((error) => console.error("Det oppstod en feil:", error));
  fetchAllTypes().catch((error) =>
    console.error("Det oppstod en feil:", error)
  );
};
