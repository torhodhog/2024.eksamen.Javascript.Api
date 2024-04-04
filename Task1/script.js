// Fetch the Pokémon
async function fetchPokemon() {
   let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
   let data = await response.json();
   let container = document.getElementById('pokemon-container');
   let types = new Set();

   for (let pokemon of data.results) {
      let response = await fetch(pokemon.url);
      let pokeData = await response.json();


      // Lager div-elementer for hvert pokemon-kort
      let div = document.createElement('div');
      div.className = 'pokemon-card';
      let img = document.createElement('img');
      img.src = pokeData.sprites.front_default;
      let h2 = document.createElement('h2');
      h2.textContent = pokeData.name;
      let p = document.createElement('p');
      let pokemonTypes = pokeData.types.map(typeInfo => typeInfo.type.name);
      p.textContent = pokemonTypes.join(', ');
      pokemonTypes.forEach(type => types.add(type));
      let buttonSave = document.createElement('button');
      buttonSave.textContent = 'Lagre';
      let buttonDelete = document.createElement('button');
      buttonDelete.textContent = 'Slett';
      let buttonEdit = document.createElement('button');
      buttonEdit.textContent = 'Rediger';

      div.dataset.types = pokemonTypes.join(', ');
      // Legger til bilde, knapper og tekst til div-elementet
      div.appendChild(img);
      div.appendChild(h2);
      div.appendChild(p);
      div.appendChild(buttonSave)
      div.appendChild(buttonDelete)
      div.appendChild(buttonEdit)
      // Samler alle div-elementene i containeren
      container.appendChild(div);
   }

   let select = document.getElementById('type-filter');
   types.forEach(type => {
      let option = document.createElement('option');
      option.value = type;
      option.textContent = type;
      select.appendChild(option);
   });
}

fetchPokemon().catch(error => console.error('Det oppstod en feil:', error));
   

