console.log('Hola 1')

function pruebaAsync() {
  return new Promise(function(resolve, reject) {
    // resolve y reject
    setTimeout(function() {
      console.log('Hola 2')
      resolve('Hola 3')
    }, 0)
  })
}

async function ejecucion() {
  const mensaje = await pruebaAsync()
  console.log(mensaje)
  console.log('Hola 4')
}

ejecucion()
