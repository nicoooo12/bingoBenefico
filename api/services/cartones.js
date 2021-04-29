const store = require('../libs/mongoose')

async function createCarton(propietario, serie){
  let bucle = true
  let resultado
  while(bucle){
    let dataGenerada = generar()
    let carton = await store.get('cartones', {data: dataGenerada, serie})
    if(!carton[0]){
      bucle=false
      let newCarton = await store.post('cartones', {
        user_id: propietario,
        data: dataGenerada,
        serie,
      })
      resultado = newCarton
    }
  }
  return resultado
}
function generar(){
  let devolver = [[0,0,0,0,0],[0,0,0,0,0],[0,0,76,0,0],[0,0,0,0,0],[0,0,0,0,0]]
  for(let i = 0; i <= 4; i++){
    for(let e = 0; e <= 4; e++){
      if(devolver[i][e] === 76){
        devolver[i][e] = 0
      }else{
        let wi = true
        let o
        let p
        while(wi){
          switch(i){
            case 0 :
              o = ((Math.round((Math.random()*14)/1)+1))
              p = compare(devolver, o)
              if(!p){
                devolver[i][e] = o
                wi = false
              }
              break;
            case 1 :
              o = ((Math.round((Math.random()*14)/1)+1) + 15)
              p = compare(devolver, o)
              if(!p){
                devolver[i][e] = o
                wi = false
              }
              break;
            case 2 :
              o = ((Math.round((Math.random()*14)/1)+1) +30)
              p = compare(devolver, o)
              if(!p){
                devolver[i][e] = o
                wi = false
              }
              break;
            case 3 :
              o = ((Math.round((Math.random()*14)/1)+1) + 45)
              p = compare(devolver, o)
              if(!p){
                devolver[i][e] = o
                wi = false
              }
              break;
            case 4 :
              o = ((Math.round((Math.random()*14)/1)+1) + 60)
              p = compare(devolver, o)
              if(!p){
                devolver[i][e] = o
                wi = false
              }
              break;
          }
        }
      }

    }
  }
  return devolver
}
function compare(arrayDe, num){
  let o = false
  for(let i = 0; i <= 4; i++){
    if (o === true) { break; }
    for(let e = 0; e <= 4; e++){
      if(arrayDe[i][e] === num){
        o = true
      }
    }
  }
  return o
}

// let test = generar()
// console.log(test);

module.exports = {
  createCarton,
}