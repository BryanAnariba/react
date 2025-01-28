/* Array Methods */
const tecnologies = ["Node", "Java", "php", "Javascript", "Python"];
const numbers = [10, 23, 44, 55, 12, 34, 55];

// Fitler: retorna un array con los elementos que cumplen la funcion
console.log(tecnologies.filter((tecnology) => tecnology !== "Node"));

// Find: retorna el primer elemento que cumple la funcion
console.log(tecnologies.find((tecnology) => tecnology === "Node"));

console.log(numbers.includes(44));
numbers.filter((n) => {
  console.log(n);
});

// Some: retorna bool si al menos uno cumple la condicion
console.log(
  "Some 55: ",
  numbers.some((n) => n === 55)
);

// Every: retorna bool, si todos los elementos cumplen la condicion
console.log(
  "Todos los numeros son mayor a 15: ",
  numbers.every((n) => n >= 15)
);

// Reduce, retorna un acumulado del total
const result = numbers.reduce((total, actualNumero) => {
  // total es 0, es decir empieza en 0 y suma todo
  return total + actualNumero;
}, 0);

console.log('Total: ', result);
