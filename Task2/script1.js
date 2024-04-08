window.onload = function () {
   let backgroundImage = document.createElement("img");
   backgroundImage.src = "/task2/assets/pokebattle.png";
   backgroundImage.style.position = "absolute";
   backgroundImage.style.width = "100%";
   backgroundImage.style.height = "100%";
   document.body.appendChild(backgroundImage);
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
         pokemonDiv.style.justifyContent = "center"; 
         pokemonDiv.style.alignItems = "center"; 
 
          let img = document.createElement("img");
          img.src = pokeData.sprites.front_default;
          pokemonDiv.appendChild(img);
 
          let pokemonName = document.createElement("h2");
          pokemonName.textContent =
             pokeData.name.charAt(0).toUpperCase() + pokeData.name.slice(1);
          pokemonDiv.appendChild(pokemonName);
 
          let hpElement = document.createElement("p");
          hpElement.textContent = `hp: 40`;
          pokemonDiv.appendChild(hpElement);
          pokemonDiv.dataset.hp = 40;

          

          charactersDiv.appendChild(pokemonDiv);
       }
    } catch (error) {
       console.error(error);
    }
}

fetchPokemon();