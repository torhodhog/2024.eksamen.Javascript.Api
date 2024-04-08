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

async function fetchPokemon() {
  try {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=3");
    let data = await response.json();

    let charactersDiv = document.createElement("div");
    charactersDiv.id = "characters";
    charactersDiv.style.position = "relative";
    charactersDiv.style.zIndex = "1";
    document.body.appendChild(charactersDiv);

    for (let i = 0; i < data.results.length; i++) {
      let pokemon = data.results[i];
      let pokeResponse = await fetch(pokemon.url);
      let pokeData = await pokeResponse.json();

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
      pokemonDiv.dataset.hp = 40;

      let betButton = document.createElement("button");
      betButton.textContent = "Sats";
      betButton.onclick = async function () {
        let betAmount = prompt("Hvor mange baller vil du satse?");
        alert(`Du har satset ${betAmount} baller. Lykke til!`);

     

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
          pokemonDiv.dataset.hp = currentHp + pot;
          hpText.textContent = pokemonDiv.dataset.hp; // Oppdater HP-verdien på skjermen
          alert(`Din nye HP-verdi er ${pokemonDiv.dataset.hp}.`);
        } else {
          // En av de andre Pokemonene vant
          alert("En av de andre Pokemonene vant.");
        }
      };
      pokemonDiv.appendChild(betButton);
      charactersDiv.appendChild(pokemonDiv);
      charactersDiv.style.display = "flex";
      charactersDiv.style.justifyContent = "space-around";
      charactersDiv.style.paddingTop = "50px";
    }
  } catch (error) {
    console.error(error);
  }
}

fetchPokemon();
