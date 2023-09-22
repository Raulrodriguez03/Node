


const deadpool = {
    nombre: 'Wade',
    apellido: 'Winston',
    poder: 'Regeneracion',
    // edad; 50;
    getNombre() {
        return `${ this.nombre } ${ this. apellido }`;
    }
}


// const nombre = deadpool.nombre;
// const apellido = deadpool.apellido;
// const poder = deadpool.poder;

function imprimeHeroe( {nombre, apellido, poder, edad = 0} ) {
    // const {nombre, apellido, poder, edad = 0} = deadpool;
    console.log(nombre, apellido, poder);
}

// imprimeHeroe( deadpool );



const  heroes = ['Deadpool', 'Superman', 'Batman'];

// const h1 = heroes[0];
// const h2 = heroes[1];
// const h3 = heroes[2];

const [ , h2, h3] = heroes;

console.log(h2, h3);