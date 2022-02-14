const searchBtn = document.getElementById('search-btn');
const pokeName = document.getElementById('poke-name');
const pokeInfo = document.getElementById('poke-info');

const typeClasses = {
    Normal: 'bg-neutral-200',
    Grass: 'bg-green-500',
    Fire: 'bg-red-500',
    Water: 'bg-cyan-400',
    Fighting: 'bg-amber-700',
    Flying: 'bg-sky-200',
    Poison: 'bg-purple-500',
    Ground: 'bg-orange-300',
    Rock: 'bg-amber-100',
    Bug: 'bg-lime-300',
    Ghost: 'bg-indigo-500',
    Electric: 'bg-yellow-300',
    Psychic: 'bg-fuchsia-500',
    Ice: 'bg-blue-200',
    Dragon: 'bg-violet-400',
    Dark: 'bg-amber-800',
    Steel: 'bg-gray-300',
    Fairy: 'bg-pink-400',
};

const colorType = (el) => {
    el.classList.add(typeClasses[el.innerText])
};

const pokeCard = (obj) => {
    const { img, name, flavor, type, type2 } = obj;
    const pokeSec = document.getElementById('poke-info');
    
    const pokeCard = document.createElement('div');
    pokeCard.classList.add('bg-white', 'rounded-md', 'shadow-md', 'shadow-slate-500', 'w-80');

    const pokeImg = document.createElement('img');
    pokeImg.src = img;
    pokeImg.classList.add('mx-auto');

    const pokeInfo = document.createElement('div');
    pokeInfo.classList.add('flex', 'flex-col');

    const pokeName = document.createElement('span');
    pokeName.classList.add('mx-2', 'flex', 'justify-between', 'mb-2');
    
    const pokeParagraph = document.createElement('p'); 
    pokeParagraph.classList.add('font-semibold')      
    pokeParagraph.innerText = name.replace(/\w/, firstLetter => firstLetter.toUpperCase());
    

    const pokeType = document.createElement('span');
    pokeType.classList.add('px-1', 'rounded', 'shadow', 'shadow-black')
    pokeType.innerText = type.replace(/\w/, firstLetter => firstLetter.toUpperCase());    
    colorType(pokeType);
    
    const pokeType2 = document.createElement('span');   
    pokeType2.classList.add('px-1', 'rounded', 'shadow', 'shadow-black') 

    const pokeHr = document.createElement('hr');
    pokeHr.classList.add('mx-2', 'bg-black', 'border', 'border-black', 'rounded-sm')

    const pokeFlavor = document.createElement('span');
    pokeFlavor.classList.add('mx-2', 'mt-2', 'text-sm');
    
    const flavorParagraph = document.createElement('p');
    flavorParagraph.classList.add('break-normal');
    flavorParagraph.innerText = flavor.replace(/\n/g, ' ')

    pokeSec.appendChild(pokeCard);
    pokeCard.appendChild(pokeImg);
    pokeCard.appendChild(pokeInfo)
    pokeInfo.appendChild(pokeName);
    pokeName.appendChild(pokeParagraph);
    pokeName.appendChild(pokeType);
    pokeInfo.appendChild(pokeHr);
    pokeInfo.appendChild(pokeFlavor);
    pokeFlavor.appendChild(flavorParagraph);

    if (type2) { 
        pokeType2.innerText = type2.replace(/\w/, firstLetter => firstLetter.toUpperCase());
        colorType(pokeType2);
        pokeName.appendChild(pokeType2)
    };
};

const fetchPokémon = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName.value.toLowerCase()}`)
    const data = await response.json();
    console.log(data)    
    const flavorText = await fetch(data.species.url);
    const flavorData = await flavorText.json();
    console.log(flavorData);

    const { name } = data;
    const { front_default: img } = data.sprites;
    const { name: type } = data.types[0].type;         
    const { flavor_text: flavor } = flavorData.flavor_text_entries[0];    
    let pokeObj = { img, name, flavor, type,};    
    if (data.types.length > 1) { 
        const { name: type2 } = data.types[1].type; 
        pokeObj = { img, name, flavor, type, type2 }    
    }

    pokeCard(pokeObj);   
    
};

searchBtn.addEventListener('click', fetchPokémon)


