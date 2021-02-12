const store = require('../libs/mongoose')

async function createCarton(propietario_correo,serial){
  let u = true
  let res
  while(u){
    let o = generar()
    let carton = await store.get('cartones', {data: o, serial})
    if(!carton[0]){
      u=false
      let uwu = await store.post('cartones', {
        propietario_correo,
        data: o,
        serial,
      })
      res = uwu
    }
  } 
  return res
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
  //return [[Math.round((Math.random()*75)/1),Math.round((Math.random()*75)/1),Math.round((Math.random()*75)/1),Math.round((Math.random()*75)/1),Math.round((Math.random()*75)/1)],[Math.round((Math.random()*75)/1),Math.round((Math.random()*75)/1),Math.round((Math.random()*75)/1),Math.round((Math.random()*75)/1),Math.round((Math.random()*75)/1)],[Math.round((Math.random()*75)/1),Math.round((Math.random()*75)/1),'X',Math.round((Math.random()*75)/1),Math.round((Math.random()*75)/1)],[Math.round((Math.random()*75)/1),Math.round((Math.random()*75)/1),Math.round((Math.random()*75)/1),Math.round((Math.random()*75)/1),Math.round((Math.random()*75)/1)],[Math.round((Math.random()*75)/1),Math.round((Math.random()*75)/1),Math.round((Math.random()*75)/1),Math.round((Math.random()*75)/1),Math.round((Math.random()*75)/1)]]
}
function compare(arrayDe, num){
  let o = false
  for(let i = 0; i <= 4; i++){
    if (o === true) { break; }
    for(let e = 0; e <= 4; e++){
      if(arrayDe[i][e] === num){
        // console.log(arrayDe[i][e] === num)
        // console.log('numero repetido')
        o = true
      }
    }
  }
  return o
}

module.exports = {
  createCarton,
}