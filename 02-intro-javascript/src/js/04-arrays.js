let numbers = [1];
numbers = [...numbers,2,3,4,10]
console.log(numbers);

const numbersMultipliedByTwo = numbers.map(n => n*2);
console.log(numbersMultipliedByTwo);