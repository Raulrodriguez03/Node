
const id = 3;
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



const getEmpleado = ( id, callback ) => {
    const  empleado = empleados.find( (e) => e.id === id )?.nombre

    if ( empleado ) {
        callback(null, empleado);
    }else {
        callback(`Empleado con id ${ id } no existe`);
    }

}

const getSalario = (id, callback) => {
    const salario = salarios.find(s => s.id === id)?.salario

    if (salario){
        callback(null, salario);
    }else {
        callback(`Salario con id ${ id } no existe`);
    }

}

getEmpleado( id, ( err,  empleado ) => {

    if ( err ) {
        console.log('ERROR')
        return console.log( err );
    }
    getSalario(id , (err, salario) => {
        if (err){
            return console.log(err);
        }
        console.log('EL empleado;', empleado, 'tiene un salario de:', salario);
    })
} )

