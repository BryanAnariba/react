import { getHeroById } from "./services/heroes.service";

const getHeroByIdAsync = (heroId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const hero = getHeroById(heroId);

      if (hero) return resolve(hero);
      
      return reject('Hero not found!');
    }, 2000);
  });
}

getHeroByIdAsync(2)
  .then((hero) => {
    console.log('Then promise after two seconds!, ', hero);
  })
  .catch((error) => console.error(error));