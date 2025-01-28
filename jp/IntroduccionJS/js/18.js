const avaliable = 4000;
const amoutToRetire = 20000;
const auth = true;

if (auth) {
    if (avaliable > amoutToRetire) {
        console.log('Success');
    } else {
        console.log('Not enough money')
    }
} else {
    console.log('Unauthorized!');
}