// Når siden lastes, legg til en bakgrunnsbilde og en div med regler for spillet.
window.onload = function () {
  let backgroundImage = document.createElement("img");
  backgroundImage.src = "/task2/assets/pokebattle.png";
  backgroundImage.style.position = "absolute";
  backgroundImage.style.width = "100%";
  backgroundImage.style.height = "100%";
  document.body.appendChild(backgroundImage);

  let rulesDiv = document.createElement("div");
  rulesDiv.id = "rules";
  rulesDiv.style.position = "fixed";
  rulesDiv.style.bottom = "0";
  rulesDiv.style.width = "100%";
  rulesDiv.style.backgroundColor = "white";
  rulesDiv.style.padding = "10px";
  rulesDiv.style.textAlign = "center";

  let rulesTitle = document.createElement("h1");
  rulesTitle.textContent = "REGELER";
  rulesDiv.appendChild(rulesTitle);

  let rulesText = document.createElement("p");
  rulesText.textContent =
    "I dette spillet skal du logisk krige mot Ivysaur og Venusaur!";
  rulesDiv.appendChild(rulesText);

  let rulesText2 = document.createElement("p");
  rulesText2.textContent =
    "Du har 40 HP og motstanderne har 40 HP. Dere satser et fritt antall pokeballer hver runde. Den som satser mest vinner runden og får ballene som ligger i potten. Den som sitter igjen med alle ballene, vinner spillet.";
  rulesDiv.appendChild(rulesText2);

  document.body.appendChild(rulesDiv);
};

// Hent inn Pokemon fra API-et og opprett en div for hver Pokemon
async function fetchPokemon() {
  let numPlayers = prompt(
    "Hvor mange spillere vil du skal spille mot hverandre?"
  );

  if (isNaN(numPlayers) || numPlayers < 1 || numPlayers > 8) {
    alert("Du må skrive inn et gyldig antall spillere (mellom 1 og 8).");
    return;
  }

  let gender = prompt("Vil du være en jente eller en gutt?");
  let charactersDiv = document.createElement("div");
  charactersDiv.id = "characters";
  charactersDiv.style.position = "relative";
  charactersDiv.style.zIndex = "3";
  charactersDiv.style.display = "flex";
  charactersDiv.style.justifyContent = "space-around";
  document.body.appendChild(charactersDiv);

  // Opprett en div for hovedspilleren
  let mainPlayerDiv = document.createElement("div");
  mainPlayerDiv.className = "pokemon";
  mainPlayerDiv.style.backgroundColor = "white";
  mainPlayerDiv.style.borderRadius = "50%";
  mainPlayerDiv.style.width = "70px";
  mainPlayerDiv.style.height = "150px";
  mainPlayerDiv.style.display = "flex";
  mainPlayerDiv.style.flexDirection = "column";
  mainPlayerDiv.style.gap = "-30px";
  mainPlayerDiv.style.justifyContent = "center";
  mainPlayerDiv.style.alignItems = "center";
  mainPlayerDiv.style.zIndex = "3";

  let playerImage;
  if (gender.toLowerCase() === "jente") {
    playerImage = "/task2/assets/female.png";
  } else if (gender.toLowerCase() === "gutt") {
    playerImage = "/task2/assets/male.png";
  } else {
    alert("Du må skrive enten 'jente' eller 'gutt'.");
    return;
  }

  let img = document.createElement("img");
  img.src = playerImage;
  mainPlayerDiv.appendChild(img);
  img.style.width = "100px";
  img.style.height = "170px";

  // Opprett en "Sats"-knapp for hovedspilleren
  let betButton = document.createElement("button");
  betButton.textContent = "Sats";
  betButton.onclick = async function () {
    betAmount = prompt("Hvor mange baller vil du satse?");
  };

  // Legg til hovedspillerens div i charactersDiv
  mainPlayerDiv.appendChild(betButton);
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

  // Vent på at alle fetch-operasjonene er ferdige
  let responses = await Promise.all(fetchPromises); 

  for (let i = 0; i < numPlayers; i++) {
    // Hent inn spiller fra API-et
    let pokeData = await responses[i].json();

    // Opprett en div for hver Pokemon
    let pokemonDiv = createPokemonDiv(pokeData, i);
    charactersDiv.appendChild(pokemonDiv);
  }

  function createPokemonDiv(pokeData, i) {
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
    img.src = pokeData.sprites.front_default;
    pokemonDiv.appendChild(img);

    let pokemonName = document.createElement("h2");
    pokemonName.textContent =
      pokeData.name.charAt(0).toUpperCase() + pokeData.name.slice(1);
    pokemonDiv.appendChild(pokemonName);

    let hpElement = document.createElement("img");
    hpElement.src = "/Task2/assets/pokeball.png";
    hpElement.style.width = "50px";
    pokemonDiv.appendChild(hpElement);

    let hpText = document.createElement("p"); // Nytt element for å vise antall baller
    hpText.textContent = i === 0 ? "40" : "?"; // Vis antall baller for Bulbasaur, men vis et spørsmålstegn for de andre Pokemonene
    pokemonDiv.appendChild(hpText);

    pokemonDiv.dataset.hp = 40;

    return pokemonDiv;
  }

  // Tilfeldig satsing for de andre Pokemonene
  let otherBets = [
    Math.floor(Math.random() * 41),
    Math.floor(Math.random() * 41),
  ];
  alert(
    `Du satset ${betAmount} baller, Ivysaur satset ${otherBets[0]} baller og Venusaur satset ${otherBets[1]} baller.`
  );

  // Legg alle satsingene i en "pott"
  let pot = parseInt(betAmount) + otherBets[0] + otherBets[1];
  alert(`Potten er nå på ${pot} baller.`);

  // Finn ut hvem som vant
  let maxBet = Math.max(parseInt(betAmount), ...otherBets);
  if (maxBet === parseInt(betAmount)) {
    // Du vant
    alert("Du vant!");

    // Øk HP-verdien med antall baller i potten
    let currentHp = parseInt(pokemonDiv.dataset.hp);
    let winnings = pot - parseInt(betAmount); // Trekker fra ditt eget bud fra potten
    pokemonDiv.dataset.hp = currentHp + winnings;
    hpText.textContent = pokemonDiv.dataset.hp; // Oppdater HP-verdien på skjermen
    alert(`Din nye HP-verdi er ${pokemonDiv.dataset.hp}.`);
  } else {
    // En av de andre Pokemonene vant
    alert("En av de andre Pokemonene vant.");

    // Trekk fra HP-verdien din med det beløpet du satset
    let currentHp = parseInt(pokemonDiv.dataset.hp);
    pokemonDiv.dataset.hp = currentHp - parseInt(betAmount);
    hpText.textContent = pokemonDiv.dataset.hp; // Oppdater HP-verdien på skjermen
    alert(`Din nye HP-verdi er ${pokemonDiv.dataset.hp}.`);

    console.log(
      `Etter at du tapte, har du nå ${pokemonDiv.dataset.hp} baller igjen.`
    ); // Logg hvor mange baller du har igjen etter at du tapte

    // Sjekk om noen har nådd 120 baller
    if (pokemonDiv.dataset.hp >= 120) {
      alert(
        `Gratulerer, ${
          pokeData.name.charAt(0).toUpperCase() + pokeData.name.slice(1)
        } har vunnet spillet!`
      );
    }

    // Sjekk om noen har nådd 0 baller
    if (pokemonDiv.dataset.hp <= 0) {
      alert(
        `${
          pokeData.name.charAt(0).toUpperCase() + pokeData.name.slice(1)
        } er ute av spillet.`
      );
      betButton.disabled = true; // Deaktiver knappen
    }
  }

  pokemonDiv.appendChild(betButton);
  charactersDiv.appendChild(pokemonDiv);
  charactersDiv.style.display = "flex";
  charactersDiv.style.justifyContent = "space-around";
  charactersDiv.style.paddingTop = "50px";
}

fetchPokemon();
