const searchBtn = document.getElementById('search-btn');
const pokeName = document.getElementById('poke-name');
const pokeInfo = document.getElementById('poke-info');

const fetchPokémon = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName.value.toLowerCase()}`)
    const data = await response.json();
       
};

searchBtn.addEventListener('click', fetchPokémon)