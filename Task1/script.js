fetch("https://pokeapi.co/api/v2/pokemon?limit=50")
   .then(response => response.json())
   .then(data => {
      console.log(data.results); // Se om dataen dukker opp i konsollen. 
   })
   .catch(error => console.error('Det oppstod en feil:', error));