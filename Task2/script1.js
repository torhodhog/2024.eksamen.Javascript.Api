// Spillrelaterte variabler
let numPlayers, gender, totalPot, mainPlayerName;

// DOM-elementer
let rulesDiv, backgroundImage, rulesTitle, rulesText, rulesText2;
let charactersDiv, mainPlayerDiv, playerImage, img, betButton;

// FUNKSJONER
async function fetchPokemon() {
  

  charactersDiv = document.createElement("div");
  charactersDiv.id = "characters";
  charactersDiv.style.position = "relative";
  charactersDiv.style.zIndex = "3";
  charactersDiv.style.display = "flex";
  charactersDiv.style.justifyContent = "space-around";
  document.body.appendChild(charactersDiv);

  mainPlayerDiv = document.createElement("div");
  mainPlayerDiv.className = "pokemon";
  mainPlayerDiv.style.backgroundColor = "white";
  mainPlayerDiv.style.borderRadius = "50%";
  mainPlayerDiv.style.width = "250px";
  mainPlayerDiv.style.height = "250px";
  mainPlayerDiv.style.display = "flex";
  mainPlayerDiv.style.flexDirection = "column";
  mainPlayerDiv.style.gap = "-30px";
  mainPlayerDiv.style.justifyContent = "center";
  mainPlayerDiv.style.alignItems = "center";
  mainPlayerDiv.style.zIndex = "3";
  mainPlayerDiv.style.paddingTop = "50px";

  img = document.createElement("img");
  if (gender.toLowerCase() === "jente") {
    img.src = "/task2/assets/female.png";
  } else if (gender.toLowerCase() === "gutt") {
    img.src = "/task2/assets/male.png";
  } else {
    alert("Du må skrive enten 'jente' eller 'gutt'.");
    return;
  }
  img.style.width = "100px";
  img.style.height = "170px";
  mainPlayerDiv.appendChild(img);

  betButton = document.createElement("button");
  betButton.textContent = "Sats";
  mainPlayerDiv.appendChild(betButton);
  charactersDiv.appendChild(mainPlayerDiv);

  // Legg til elementer i DOM
  document.body.appendChild(charactersDiv);
  mainPlayerDiv.appendChild(img);
  charactersDiv.appendChild(mainPlayerDiv);

  // Fetch Pokemon data
  let response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${numPlayers}`
  );
  let data = await response.json();

  // Loop gjennom resultatene og hent inn data for hver Pokemon
  for (let i = 0; i < data.results.length; i++) {
    let pokemonDataResponse = await fetch(data.results[i].url);
    let pokemonData = await pokemonDataResponse.json();
    let pokemonDiv = createPokemonDiv(pokemonData, i);
    charactersDiv.appendChild(pokemonDiv);
  }
}

function createPokemonDiv(pokemonData, i) {
  let pokemonDiv = document.createElement("div");
  pokemonDiv.className = "pokemon";
  pokemonDiv.style.backgroundColor = "white";
  pokemonDiv.style.borderRadius = "50%";
  pokemonDiv.style.width = "250px";
  pokemonDiv.style.height = "250px";
  pokemonDiv.style.display = "flex";
  pokemonDiv.style.flexDirection = "column";
  pokemonDiv.style.gap = "-30px";
  pokemonDiv.style.justifyContent = "center";
  pokemonDiv.style.alignItems = "center";

  let img = document.createElement("img");
  img.src = pokemonData.sprites.front_default;
  pokemonDiv.appendChild(img);

  let pokemonName = document.createElement("h2");
  pokemonName.textContent =
    pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);
  pokemonDiv.appendChild(pokemonName);

  let hpElement = document.createElement("img");
  hpElement.src = "/Task2/assets/pokeball.png";
  hpElement.style.width = "50px";
  pokemonDiv.appendChild(hpElement);

  let hpText = document.createElement("p");
  hpText.textContent = pokemonData.name === mainPlayerName ? "40" : "?";
  pokemonDiv.appendChild(hpText);

  pokemonDiv.dataset.hp = 40;

  return pokemonDiv;
}
function getGameSettings() {
  numPlayers = prompt("Hvor mange spillere vil du skal spille mot hverandre?");
  gender = prompt("Vil du være en jente eller en gutt?");
  totalPot = numPlayers * 40; // Initialiser totalPot med det totale antallet baller
}

window.onload = async function () {
  getGameSettings();


  backgroundImage = document.createElement("img");
  backgroundImage.src = "/task2/assets/pokebattle.png";
  backgroundImage.style.position = "absolute";
  backgroundImage.style.width = "100%";
  backgroundImage.style.height = "100%";
  document.body.appendChild(backgroundImage);

  rulesDiv = document.createElement("div");
  rulesDiv.id = "rules";
  rulesDiv.style.position = "fixed";
  rulesDiv.style.bottom = "0";
  rulesDiv.style.width = "100%";
  rulesDiv.style.backgroundColor = "white";
  rulesDiv.style.padding = "10px";
  rulesDiv.style.textAlign = "center";

  rulesTitle = document.createElement("h1");
  rulesTitle.textContent = "REGELER";
  rulesDiv.appendChild(rulesTitle);

  rulesText = document.createElement("p");
  rulesText.textContent =
    "I dette spillet skal du logisk krige mot Ivysaur og Venusaur!";
  rulesDiv.appendChild(rulesText);

  rulesText2 = document.createElement("p");
  rulesText2.textContent =
    "Du har 40 HP og motstanderne har 40 HP. Dere satser et fritt antall pokeballer hver runde. Den som satser mest vinner runden og får ballene som ligger i potten. Den som sitter igjen med alle ballene, vinner spillet.";
  rulesDiv.appendChild(rulesText2);

  document.body.appendChild(rulesDiv);

  await fetchPokemon();
  console.log("fetchPokemon() kjørt");
};
