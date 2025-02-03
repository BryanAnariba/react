/* Evaluacion de corto circuito */
const auth = true;

if (40) {
    console.log('Thruty');
} else {
    console.log('Falsy');
}

// Evaluacion de corto circuito
auth && console.log('User authenticated');