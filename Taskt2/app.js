// In your JavaScript file
window.onload = function () {
  let rulesDiv = document.getElementById("rules");
  let startGameButton = document.getElementById("start-game");

  startGameButton.addEventListener("click", function () {
    rulesDiv.style.display = "none";
  });
};

async function fetchPokemon() {
  try {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=4");
    let data = await response.json();

    let charactersDiv = document.getElementById("characters");
    charactersDiv.style.position = "relative";
    charactersDiv.style.zIndex = "1";

    for (let i = 0; i < data.results.length; i++) {
      let pokemon = data.results[i];
      let pokeResponse = await fetch(pokemon.url);
      let pokeData = await pokeResponse.json();

      let pokemonDiv = document.createElement("div");
      pokemonDiv.className = "pokemon";

      let img = document.createElement("img");
      img.src = pokeData.sprites.front_default;
      pokemonDiv.appendChild(img);

      let pokemonName = document.createElement("h2");
      pokemonName.textContent =
        pokeData.name.charAt(0).toUpperCase() + pokeData.name.slice(1);
      pokemonDiv.appendChild(pokemonName);

      pokeData.stats.forEach((stat) => {
        let statElement = document.createElement("p");
        let newStatValue;

        if (stat.stat.name === "hp") {
          newStatValue = 200; // Legger lik HP og Attack for å gjøre det lettere å spille.
          pokemonDiv.dataset.hp = newStatValue;
        } else if (stat.stat.name === "attack") {
          newStatValue = 30; // New value for attack
          pokemonDiv.dataset.attack = newStatValue;
        }

        if (newStatValue) {
          statElement.textContent = `${stat.stat.name}: ${newStatValue}`;
          pokemonDiv.appendChild(statElement);
        }
      });

      if (i === 0) {
        // Du er hovedkarakter, index 0. Starter å angripe.
        let attackButton = document.createElement("button");
        attackButton.textContent = "ANGRIP";
        attackButton.style.backgroundColor = "red";
        attackButton.style.color = "white";
        attackButton.style.border = "none";
        pokemonDiv.appendChild(attackButton);

        attackButton.addEventListener("click", function () {
          let targetName = prompt("Hvem vil du angripe?");
          let pokemonsDivs = Array.from(document.querySelectorAll(".pokemon"));
          let targetDiv = pokemonsDivs.find(
            (div) =>
              div.querySelector("h2").textContent.toLowerCase() ===
              targetName.toLowerCase()
          );

          if (targetDiv) {
            targetDiv.dataset.hp -= 30;
            let hpElements = Array.from(targetDiv.querySelectorAll("p"));
            let hpElement = hpElements.find((p) =>
              p.textContent.includes("hp")
            );
            hpElement.textContent = `hp: ${targetDiv.dataset.hp}`;
          } else {
            alert("Ingen Pokémon med det navnet ble funnet.");
          }

         // Venusaur sin tur til å angripe
         let maxHp = Math.max(...pokemonsDivs.map((div) => div.dataset.hp));
         let targetDivs = pokemonsDivs.filter((div) => div.dataset.hp == maxHp);

         for (let targetDiv of targetDivs) {
            targetDiv.dataset.hp -= 30;
            let hpElements = Array.from(targetDiv.querySelectorAll("p"));
            let hpElement = hpElements.find((p) => p.textContent.includes("hp"));
            hpElement.textContent = `hp: ${targetDiv.dataset.hp}`;
         }

         let targetNames = targetDivs.map(div => div.querySelector("h2").textContent).join(", ");
         alert(`Venusaur angrep ${targetNames}, og de ble trukket 30 i HP.`);

        });
      }

      charactersDiv.appendChild(pokemonDiv);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchPokemon();
