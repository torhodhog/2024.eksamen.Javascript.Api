
const typeColors = {
   normal: '#A8A77A',
   fire: '#EE8130',
   water: '#6390F0',
   electric: '#F7D02C',
   grass: '#7AC74C',
   ice: '#96D9D6',
   fighting: '#C22E28',
   poison: '#A33EA1',
   ground: '#E2BF65',
   flying: '#A98FF3',
   psychic: '#F95587',
   bug: '#A6B91A',
   rock: '#B6A136',
   ghost: '#735797',
   dragon: '#6F35FC',
   dark: '#705746',
   steel: '#B7B7CE',
   fairy: '#D685AD',
 };

// Fetch the Pokemon
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
      div.style.backgroundColor = typeColors[pokeData.types[0].type.name]; //Setter bakgrunnsfarge basert på første type. 
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

      div.dataset.types = pokemonTypes.join(', '); // I tilfelle flere typer, skilles de med et komma. 
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

   async function fetchAllTypes() {
      let response = await fetch("https://pokeapi.co/api/v2/type"); // Fetcher API på nytt for å finne alle typpene, ikke kun de som vises fra første fetch. 
      let data = await response.json();
      let select = document.getElementById('type-filter');
      data.results.forEach(type => {
         let option = document.createElement('option');
         option.value = type.name;
         option.textContent = type.name;
         select.appendChild(option);
      });
   }
   

   fetchAllTypes().catch(error => console.error('Det oppstod en feil:', error));
}

fetchPokemon().catch(error => console.error('Det oppstod en feil:', error));
   

