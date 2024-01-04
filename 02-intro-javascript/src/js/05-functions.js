function greet(name) {
  return `Hello ${name}`;
}

const greetingTo = (name) => {
  return `Hello ${name}`;
}

const getUser = () => ({ uid: 'abc123', userName: 'El Papi 1501' })

const getUserActive = (name) => ({ uuid: '123123', name: name, })

console.log(greet('Goku'));
console.log(greetingTo('Vegeta'));
console.log(getUser());

const userActive = getUserActive('bsanchez@gmail.com');
console.log({userActive});