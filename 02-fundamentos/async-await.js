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

const getInfoUsuario = async () => {
    return 'Hola Mundo'
}

getInfoUsuario()

