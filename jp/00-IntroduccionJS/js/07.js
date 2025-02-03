// Union de dos objetos
const product = {
  name: "Coca Cola",
  price: 1.79,
  avaliable: false,
  quantity: 80,
};

const client = {
  id: 1,
  name: "Goku",
};

const product2 = {
  name: "Pepsi Cola",
  price: 1.5,
  avaliable: true,
  quantity: 180,
};

const shoppingCar = {
  ...product,
  ...client,
};

console.log("Shopping car: ", shoppingCar);
