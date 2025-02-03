/* Optional chaining ? */
const classmate = {
    name: 'Goku',
    class: 'Programacion I',
    aproved: true,
    exams: {
        examOne: 90,
    }
};

// Si existe que lo muestre pero no truene la app
console.log(classmate.exams?.examOne)

/* Optional coolescing operator ?? */
const page = undefined ?? 1; // Si es null page tendra el valor de uno si no asigna el valor de la izquierda
console.log(page)