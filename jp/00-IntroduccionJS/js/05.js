// Manipulacion de objectos

const product = {
    name: "Coca Cola",
    price: 1.79,
    avaliable: false,
    quantity: 80,
};
 
// Sobre el objeto el cual opera no permite que dicho objeto se cambie o modifique Object.freeze y Object.seal si permite modificar pero no agregar nuevos campos
Object.freeze(product);

product.avaliable = true;

delete product.quantity;

console.log(product);
