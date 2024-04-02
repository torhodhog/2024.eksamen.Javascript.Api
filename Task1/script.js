fetch("https://pokeapi.co/api/v2/pokemon?limit=50")
   .then(response => response.json())
   .then(data => {
      let container = document.getElementById('pokemon-container');
      data.results.forEach(pokemon => {
         fetch(pokemon.url)
            .then(response => response.json())
            .then(pokeData => {
               let div = document.createElement('div');
               let img = document.createElement('img');
               img.src = pokeData.sprites.front_default;
               let h2 = document.createElement('h2');
               h2.textContent = pokeData.name;
               let p = document.createElement('p');
               p.textContent = pokeData.types.map(typeInfo => typeInfo.type.name).join(', ');
               let buttonSave = document.createElement('button');
               buttonSave.textContent = 'Lagre';
               let buttonDelete = document.createElement('button');
               buttonDelete.textContent = 'Slett';

               div.appendChild(img);
               div.appendChild(h2);
               div.appendChild(p);
               div.appendChild(buttonSave)
               div.appendChild(buttonDelete)

               container.appendChild(div);
            });
      });
   })
   .catch(error => console.error('Det oppstod en feil:', error));