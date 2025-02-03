// Desestructuracion de 2 o mas Objetos
const product = {
    name: "Coca Cola",
    price: 1.79,
    avaliable: false,
    quantity: 80,
};

const client = {
    name: "Goku Perez",
    premium: true, 
}

const { name: productName } = product;
const { name: clientName } = client;

console.log({productName, clientName});
