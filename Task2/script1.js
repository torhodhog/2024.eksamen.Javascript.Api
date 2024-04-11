// Spillrelaterte variabler REFERANSE:2
let numPlayers, gender, totalPot, mainPlayerName, betAmount, hpText;

// DOM-elementer
let rulesDiv, backgroundImage, rulesTitle, rulesText, rulesText2;
let charactersDiv,
  mainPlayerDiv,
  playerImage,
  img,
  betButton,
  potDiv,
  currentBet,
  currentAmount,
  deliverPotButton,
  highestBettingPlayer;

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
  mainPlayerDiv.style.marginTop = "250px";

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
  hpText = document.createElement("p");
  hpText.textContent = 40;
  mainPlayerDiv.appendChild(betButton);
  mainPlayerDiv.appendChild(hpText);
  charactersDiv.appendChild(mainPlayerDiv);

  betButton.onclick = function () {
    betAmount = prompt("Hvor mange baller vil du satse?");

    if (betAmount < 1 || betAmount > playerBalls) {
      alert(
        "Ugyldig innsats. Du må satse mellom 1 og " + playerBalls + " baller."
      );
      return;
    }

    betAmount = Number(betAmount);

    currentBet = betAmount;
    playerBalls -= betAmount;
    hpText.textContent = playerBalls;

    if (playerBalls === 0) {
      gameOver();
    }

    // Oppdater visningen av totalpotten og currentBet
    potDiv.textContent = `Det er ${numPlayers} spillere med, og totalpotten er ${totalPot}. Innsatsen din denne runden er ${currentBet}. Du har nå ${playerBalls} baller igjen.`;
    // Generer en tilfeldig innsats for hver av de andre spillerne og oppdater HP-teksten deres
    let otherPlayers = document.querySelectorAll(".pokemon:not(:first-child)");
    otherPlayers.forEach((player) => {
      let bet = Math.floor(Math.random() * 30) + 1; 
      let hpText = player.querySelector("p");
      hpText.textContent = bet;
    });

  let allPlayers = document.querySelectorAll(".pokemon");
  let highestBet = Math.max(
    ...Array.from(allPlayers, (player) =>
      Number(player.querySelector("p").textContent)
    )
  );
  highestBettingPlayer = Array.from(allPlayers).find(
    (player) => Number(player.querySelector("p").textContent) === highestBet
  );

  function createButton(text, backgroundColor) {
    let button = document.createElement("button");
    button.textContent = text;
    button.style.display = "none";
    button.style.position = "fixed";
    button.style.zIndex = "999";
    button.style.bottom = "500px";
    button.style.right = "700px";
    button.style.backgroundColor = backgroundColor;
    button.style.width = "200px";
    button.style.height = "200px";
    button.style.color = "white";
    document.body.appendChild(button);
    return button;
}

let deliverPotButton = createButton("Lever potten", "blue");
let newRoundButton = createButton("Ny runde", "green");


    newRoundButton.onclick = function () {
      // Skjul newRoundButton og vis deliverPotButton
      newRoundButton.style.display = "none";
      deliverPotButton.style.display = "block";
      // Sjekk om spillet er over.  
      if (playerBalls === 0 && highestBettingPlayer !== mainPlayerDiv) {
        gameOver();
      }

      // Start en ny runde ved å tilbakestille innsatsene
      otherPlayers.forEach((player) => {
        player.querySelector("p").textContent = "?";
      });
      currentBet = 0;

      // Vis "Sats" knappen igjen
      betButton.style.display = "block";
    };

    deliverPotButton.style.display = "block";

    deliverPotButton.onclick = function () {
      // Finn spilleren med den høyeste innsatsen
      let allPlayers = document.querySelectorAll(".pokemon");

      // Finn spilleren med høyest poengsum //REFERANSE: 3
      let highestBet = Math.max(
        ...Array.from(allPlayers, (player) =>
          Number(player.querySelector("p").textContent)
        )
      );

      let highestBettingPlayer = Array.from(allPlayers).find(
        (player) => Number(player.querySelector("p").textContent) === highestBet
      );    
      
      console.log('highestBettingPlayer:', highestBettingPlayer); // Legg til denne linjen


      // Her har jeg fått hjelp med totalBet. REFERANSE: 1
      let totalBet =
        Array.from(otherPlayers, (player) =>
          Number(player.querySelector("p").textContent)
        ).reduce((a, b) => a + b, 0) + currentBet;

      // Oppdater HP-verdien til vinneren
      let winnerCurrentHP = Number(
        highestBettingPlayer.querySelector("p").textContent
      );
      let winnerNewHP = winnerCurrentHP + totalBet - highestBet;
      highestBettingPlayer.querySelector("p").textContent = winnerNewHP;

   
      if (highestBettingPlayer === mainPlayerDiv) {
        playerBalls = winnerNewHP;
        hpText.textContent = playerBalls;
      }
      // Vis en melding som sier at potten blir levert til spilleren med den høyeste innsatsen
      alert(
        `Lever potten på ${totalBet} til ${
          highestBettingPlayer.querySelector("h2").textContent
        }`
      );

      // Skjul deliverPotButton og start neste runde.
      deliverPotButton.style.display = "none";
      newRoundButton.style.display = "block";

      // Tilbakestill currentBet
      currentBet = 0;
    };
  };

  // Sjekk om spillet er over

  function winner() {
    alert("Gratulerer! Du vant spillet!");
  }

  function gameOver() {
    let loseVideo = document.createElement("video");
    loseVideo.src = "assets/losethebattle.mp4";
    loseVideo.style.width = "400px";
    loseVideo.style.height = "400px";
    loseVideo.style.position = "fixed";
    loseVideo.style.left = "40%";
    loseVideo.style.top = "40%";
    loseVideo.style.zIndex = "1000";
    loseVideo.autoplay = true;
    document.body.appendChild(loseVideo);

    // Oppretter en "Prøv igjen" knapp
    let retryButton = document.createElement("button");
    retryButton.textContent = "Prøv igjen";
    retryButton.style.display = "none"; // Skjul knappen til videoen er ferdig
    document.body.appendChild(retryButton);

    // Legg til en event listener for 'ended' event på videoen
    loseVideo.addEventListener("ended", function () {
      // Når videoen er ferdig, vis "Prøv igjen" knappen
      retryButton.style.display = "block";
      document.body.removeChild(loseVideo);
    });

    // Legg til en onclick event til "Prøv igjen" knappen for å oppdatere siden
    retryButton.onclick = function () {
      location.reload();
    };

    // Spill videoen
    loseVideo.play();
  }

  // Legg til elementer i DOM
  document.body.appendChild(charactersDiv);
  mainPlayerDiv.appendChild(img);
  charactersDiv.appendChild(mainPlayerDiv);

  // Fetch Pokemon data
  let response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${numPlayers}`
  );
  let data = await response.json();

  // Looper gjennom resultatene og hent inn data for hver Pokemon
  for (let i = 0; i < data.results.length; i++) {
    let pokemonDataResponse = await fetch(data.results[i].url);
    let pokemonData = await pokemonDataResponse.json();
    let pokemonDiv = createPokemonDiv(pokemonData, i);
    charactersDiv.appendChild(pokemonDiv);
  }
}

function createPokemonDiv(pokemonData, i) {
  let pokemonDiv = document.createElement("div");
  pokemonDiv.id = "player" + i;
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
  pokemonDiv.style.marginTop = "250px";

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
console.log("getGameSettings() kjørt");
  numPlayers = prompt("Hvor mange spillere vil du utfordre?");
  gender = prompt("Vil du være en jente eller en gutt?");
  totalPot = numPlayers * 40 + 40; //  TotalPot med det totale antallet baller, plusser på 40 for å inkludere mainPlayer, noe som gjør at totalPot er 40 mer enn antall motspillere.
  playerBalls = 40; //  Antall baller spilleren har ved oppstart.

  potDiv = document.createElement("div");
  potDiv.textContent = `Det er ${numPlayers} motstandere med, og totalpotten er ${totalPot}.`;
  document.body.appendChild(potDiv);
}

window.onload =  async function () {
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
    "I dette spillet skal du drive logisk krigføring mot en motstander som prøver å stjele dine pokeballer!";
  rulesDiv.appendChild(rulesText);

  rulesText2 = document.createElement("p");
  rulesText2.textContent =
    "Alle spillere har 40HP (Pokemonballer). Alle satser et fritt antall pokeballer hver runde. Den som satser mest vinner runden og får ballene som ligger i potten. Klarer du å vinne alle ballene? Lykke til!";
  rulesDiv.appendChild(rulesText2);

  document.body.appendChild(rulesDiv);

  await fetchPokemon();
};

/*
REFERANSER:

1. AI - Hjelp med totalBet. Da jeg skulle finne summen av alle innsatsene til spillerne, og legge til min egen innsats fikk jeg problemer   ved at jeg ikke fikk lagt til min egen innsats. AI hjalp meg med å legge til min egen innsats i arrayet.
2. Bok - Koding for alle i JavaScript, av Terje Kolderup
3. Spred operator - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax


MANGLER I KODEN:

- Jeg finner ikke ut av hvorfor du blir promptet om å skrive inn antall spillere og kjønn to ganger.Dette er en bug jeg ville brukt mer tid på å fikse, hadde det ikke vært for tidsfristen.

- Rent praktisk ville jeg også lagt til at spillbrett og regler dukket opp før promptene. Da hadde det vært lettere å vite hva man faktisk svarte på og hvorfor. 

*/
