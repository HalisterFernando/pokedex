const searchBtn = document.getElementById('search-btn');
const pokeName = document.getElementById('poke-name');
const pokeInfo = document.getElementById('poke-info');

const fetchPokémon = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName.value.toLowerCase()}`)
    const data = await response.json();
    console.log(data)
    const pokeImg = data.sprites.versions['generation-iv']['diamond-pearl'].front_default;
    const flavor = await fetch(data.species.url);
    const flavorData = await flavor.json();
    console.log(flavorData)
    
   const img = document.createElement('img')
   img.src = pokeImg

   pokeInfo.appendChild(img)
    
};

searchBtn.addEventListener('click', fetchPokémon)