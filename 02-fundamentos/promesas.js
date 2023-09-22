const empleados = [
    {
        id: 1,
        Nombre: 'Raul'
    },
    {
        id: 2,
        Nombre: 'Susana'
    },
    {
        id: 3,
        Nombre: 'Gabriel'
    },
]

const salarios = [
    {
        id: 1,
        salario: 1000,
    },
    {
        id: 2,
        salario: 1500,
    },
];


const getEmpleado = ( id ) => {

    return  new Promise( ( resolve, reject) => {
        const  empleado = empleados.find( (e) => e.id === id )?.Nombre

        empleado
            ? resolve( empleado )
            : reject(`No existe empleado con id ${ id }`);
    });
}

const getSalario = (id) => {
    return new Promise( (resolve, reject) => {
        const  salario = salarios.find( (e) => e.id === id )?.salario

        salario
            ? resolve( salario )
            : reject(`No existe el salario con id ${ id }`);
    });
}

const id = 1;
//
// getEmpleado( id )
//     .then( (empleado) => {console.log(empleado)})
//     .catch( (err) => {console.log( err )})
//
//
// getSalario( id )
//     .then( (salario) => {console.log( salario )})
//     .catch( (err) => {console.log(err)})

//-------------------------------------------LO MISMO PERO MAL ESTRUCTURADO --------------------------------------------
// getEmpleado( id ) .then( (empleado) => {
//     getSalario( id ) .then( (salario) => {
//         console.log(' El empleado: ',empleado, '   Con salario de: ',salario);
//     })
//         .catch( (err) => {
//             console.log(err)});
// })
// .catch( (err) => {
//     console.log(err);
// })


//--------------------------------------------LO BUENO -----------------------------------------------------------------
let nombre;

getEmpleado( id )
    .then( empleado => {
        nombre = empleado;
        return getSalario(id)
    } )
    .then( salario => console.log('El empleado', nombre, 'tiene un salario de:', salario))
    .catch( err => console.log( err ))