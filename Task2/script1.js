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
   rulesDiv.appendChild(rulesTitle)

   let rulesText = document.createElement("p");
   rulesText.textContent = "I dette spillet skal du logisk krige mot Ivysaur og Venusaur!";
   rulesDiv.appendChild(rulesText);

   let rulesText2 = document.createElement("p");
   rulesText2.textContent = "Du har 40 HP og motstanderne har 40 HP. Dere satser et fritt antall pokeballer hver runde. Den som satser mest vinner runden og får ballene som ligger i potten. Den som sitter igjen med alle ballene, vinner spillet.";
   rulesDiv.appendChild(rulesText2);

   document.body.appendChild(rulesDiv);
}

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

  if (i === 0) {
    // For den første Pokemonen, vis tallet 40
    let hpText = document.createTextNode("40");
    pokemonDiv.appendChild(hpText);
  } else {
   let hpText = document.createTextNode("?");
   pokemonDiv.appendChild(hpText);
  }
      

          

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