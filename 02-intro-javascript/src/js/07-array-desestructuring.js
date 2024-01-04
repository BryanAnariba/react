const characters = ['Goku', 'Trunks', 'Gohan'];

console.log(characters.at(0));
console.log(characters[1]);

const [characterOne, , characterThree ] = characters;
console.log({characterOne, characterThree});

const returnArray = () => {
  return ['ABC', 123];
}

const [letras, numeros] = returnArray();
console.log({letras, numeros});

const useState = (heroName) => {
  return [
    heroName,
    function setHeroName() {
      console.log('Hellooo! ' + heroName);
    }
  ];
}

const [heroName, setHeroName] = useState('Saitama');
setHeroName();