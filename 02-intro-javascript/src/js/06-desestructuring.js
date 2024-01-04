const hero = {
  heroName: 'Tony',
  age: 40,
  heroKey: 'Iron Man',
  iat: {
    lat: 1,
    long: 5
  }
};

const useContext = ({heroName, age, heroKey, range = 'Capitan', iat}) => {
  return {heroName, age, heroKey, range, iat};
}

const {heroName, heroKey, iat} = useContext(hero);
const {lat, long} = iat;
console.log({heroName, heroKey, lat, long});