console.log('Inicio de programa');

setTimeout( () => {

    console.log('Primer timeout');

}, 3000)

setTimeout( () => {

    console.log('Segundo timeout');

}, 0)

setTimeout( () => {

    console.log('Tercero timeout');

}, 0)



console.log('Fin del programa');