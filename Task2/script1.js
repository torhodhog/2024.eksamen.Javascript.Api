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
  deliverPotButton;

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

  
    // Valider innsatsen
    if (betAmount < 1 || betAmount > playerBalls) {
      alert(
        "Ugyldig innsats. Du må satse mellom 1 og " + playerBalls + " baller."
      );
      return;
    }

    betAmount = Number(betAmount);

    // Oppdater currentBet og spillerens antall baller
    currentBet = betAmount;
    playerBalls -= betAmount;
    hpText.textContent = playerBalls;

    if(playerBalls === 0) {
      gameOver();
    }

    // Oppdater visningen av totalpotten og currentBet
    potDiv.textContent = `Det er ${numPlayers} spillere med, og totalpotten er ${totalPot}. Innsatsen din denne runden er ${currentBet}. Du har nå ${playerBalls} baller igjen.`;    
    // Generer en tilfeldig innsats for hver av de andre spillerne og oppdater HP-teksten deres
    let otherPlayers = document.querySelectorAll(".pokemon:not(:first-child)");
    otherPlayers.forEach((player) => {
      let bet = Math.floor(Math.random() * 40) + 1; // Generer en tilfeldig innsats mellom 1 og 40
      let hpText = player.querySelector("p");
      hpText.textContent = bet;
    });

    deliverPotButton = document.createElement("button");
    deliverPotButton.textContent = "Lever potten";
    deliverPotButton.style.display = "none";
    deliverPotButton.style.position = "fixed";
    deliverPotButton.style.zIndex = "999";
    deliverPotButton.style.bottom = "500px";
    deliverPotButton.style.right = "700px";
    deliverPotButton.style.backgroundColor = "Blue";
    deliverPotButton.style.width = "200px";
    deliverPotButton.style.height = "200px";
    deliverPotButton.style.color = "white";
    document.body.appendChild(deliverPotButton);

    let newRoundButton = document.createElement("button");
    newRoundButton.textContent = "Ny runde";
    newRoundButton.style.display = "none"; // Skjul knappen til å begynne med
    newRoundButton.style.position = "fixed";
    newRoundButton.style.zIndex = "999";
    newRoundButton.style.bottom = "500px";
    newRoundButton.style.right = "700px";
    newRoundButton.style.backgroundColor = "green";
    newRoundButton.style.width = "200px";
    newRoundButton.style.height = "200px";
    newRoundButton.style.color = "white";
    document.body.appendChild(newRoundButton);


    // Funksjon for å tilbakestille innsatsene. Brukes når en runde er ferdig, at du først leverer potten til spillerne, før du kan starte en ny runde.

    newRoundButton.onclick = function () {
      // Skjul newRoundButton og vis deliverPotButton
      newRoundButton.style.display = "none";
      deliverPotButton.style.display = "block";

      // Start en ny runde ved å tilbakestille innsatsene
      otherPlayers.forEach(player => {
        player.querySelector('p').textContent = "?";
      });
      currentBet = 0;

      // Vis "Sats" knappen igjen
      betButton.style.display = "block";
    };

    deliverPotButton.style.display = "block";
    

    deliverPotButton.onclick = function () {
      // Finn spilleren med den høyeste innsatsen
      let allPlayers = document.querySelectorAll(".pokemon");

      // Find the player with the highest bet
      let highestBet = Math.max(
        ...Array.from(allPlayers, (player) =>
          Number(player.querySelector("p").textContent)
        )
      );
    
      let highestBettingPlayer = Array.from(allPlayers).find(
        (player) => Number(player.querySelector("p").textContent) === highestBet
      );

      // Her har jeg fått hjelp med totalBet. REFERANSE: 1
      let totalBet = Array.from(otherPlayers, player => Number(player.querySelector('p').textContent)).reduce((a, b) => a + b, 0) + currentBet;

      // Oppdater HP-verdien til vinneren
      let winnerCurrentHP = Number(highestBettingPlayer.querySelector('p').textContent);
      let winnerNewHP = winnerCurrentHP + totalBet - highestBet;
      highestBettingPlayer.querySelector('p').textContent = winnerNewHP;

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

      
    };
  };

  // Sjekk om spillet er over
  
  function gameOver() {
    // Opprett et videoelement
    let loseVideo = document.createElement('video');
    loseVideo.src = 'Task2/assets/losethebattle.mp4';
    loseVideo.style.width = '100%';
    loseVideo.style.height = '100%';
    loseVideo.style.autoplay = true;
    document.body.appendChild(loseVideo);

    // Opprett en "Prøv igjen" knapp
    let retryButton = document.createElement('button');
    retryButton.textContent = 'Prøv igjen';
    retryButton.style.display = 'none'; // Skjul knappen til videoen er ferdig
    document.body.appendChild(retryButton);

    // Legg til en event listener for 'ended' event på videoen
    loseVideo.addEventListener('ended', function () {
      // Når videoen er ferdig, vis "Prøv igjen" knappen
      retryButton.style.display = 'block';
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
  numPlayers = prompt("Hvor mange spillere vil du utfordre?");
  gender = prompt("Vil du være en jente eller en gutt?");
  totalPot = numPlayers * 40 + 40; //  TotalPot med det totale antallet baller, plusser på 40 for å inkludere mainPlayer, noe som gjør at totalPot er 40 mer enn antall motspillere.
  playerBalls = 40; //  Antall baller spilleren har ved oppstart.

  potDiv = document.createElement("div");
  potDiv.textContent = `Det er ${numPlayers} motstandere med, og totalpotten er ${totalPot}.`;
  document.body.appendChild(potDiv);
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
    "I dette spillet skal du drive logisk krigføring mot en motstander som prøver å stjele dine pokeballer!";
  rulesDiv.appendChild(rulesText);

  rulesText2 = document.createElement("p");
  rulesText2.textContent =
    "Alle spillere har 40HP (Pokemonballer). Alle satser et fritt antall pokeballer hver runde. Den som satser mest vinner runden og får ballene som ligger i potten. Klarer du å vinne alle ballene? Lykke til!";
  rulesDiv.appendChild(rulesText2);

  document.body.appendChild(rulesDiv);

  await fetchPokemon();
  console.log("fetchPokemon() kjørt");
};


/*
REFERANSER:

1. AI - Hjelp med totalBet. Da jeg skulle finne summen av alle innsatsene til spillerne, og legge til min egen innsats fikk jeg problemer   ved at jeg ikke fikk lagt til min egen innsats. AI hjalp meg med å legge til min egen innsats i arrayet.
2. Bok - Koding for alle i JavaScript, av Terje Kolderup
3.

*/

/* 
MANGLER I KODEN:

- Jeg finner ikke ut av hvorfor du blir promptet om å skrive inn antall spillere og kjønn to ganger.Dette er en bug jeg ville brukt mer tid på å fikse, hadde det ikke vært for tidsfristen.

- Rent praktisk ville jeg også lagt til at spillbrett og regler dukket opp før promptene. Da hadde det vært lettere å vite hva man faktisk svarte på og hvorfor. 

*/