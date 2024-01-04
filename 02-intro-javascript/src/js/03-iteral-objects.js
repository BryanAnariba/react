const person = {
  name: 'Tony',
  lastName: 'Stark',
  age: 40,
  address: {
    city: 'New York',
    latitude: 50.1111233,
    longitude: 11.222022,
    iat: 12.22,
  }
};

// Si se iguala asi entonces persona dos es una referencia a persona uno, si cambias algo a persona dos persona uno se modificara (ESTO NO SE DEBE HACER)
const personTwo = person;
personTwo.name = 'Peter'

// Esta seria una manera de crear uno nuevo (ESTO SI SE DEBE HACER)
const personThree = {...person};
personThree.name = 'Bryan';

console.log('Person: ', person);
console.log('Person Name:', person.name);
console.log('Person Last Name:', person.lastName);
console.log('Keys: ', Object.keys(person));
console.log('Exist key name in person: ', Object.keys(person).find(k => k === 'name') === 'name');