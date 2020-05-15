function hola( callback ) {
  callback('Jeisson')
}


const saludar = function(nombre) {
  console.log('Mi nombre es ' + nombre)
}

hola( saludar )

//-------------------------------

function forEach( callback ) {
  const arreglo = [1, 2, 3]

  for(let i = 0; i < 3; i++) {
    callback( arreglo[i] )
  }
}


const arreglo = [1, 2, 3]

arreglo.forEach( function(valor) {
  console.log(valor)
} )
