export const getUser = () => ({
    uid: 'ABC123',
    username: 'El_Papi1502'
});


const user = getUser();
// console.log(user);

// Tarea
export const getUsuarioActivo = (nombre) => ({
    uid: 'ABC567',
    username: nombre.toUpperCase(),
})

const usuarioActivo = getUsuarioActivo('Fernando');
// console.log(usuarioActivo);