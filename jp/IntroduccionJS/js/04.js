const product = {
  name: "Coca Cola",
  price: 1.79,
  avaliable: true,
  quantity: 80,
};

console.log(product);
console.log(product.price);

const { name, price } = product;
console.log(`${name} - ${price}`);
