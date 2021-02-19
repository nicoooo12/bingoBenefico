const Handlebars = require('handlebars')

Handlebars.registerHelper('array', function (aString, num) {
  return (aString[num])
})

Handlebars.registerHelper('obj', function (aString) {
  return JSON.stringify(aString)
})

Handlebars.registerHelper('num', function (aString) {
  return ('000' + aString).slice(-3)
})

Handlebars.registerHelper('nume', function (aStrioqong) {
  let owo = aStrioqong.toString()
  owo = ('          ' + owo).slice(-10)
  return `${+owo.slice(0,1) ? (owo.slice(0,1)+'.') : ''}${+owo.slice(1,4) ? (owo.slice(1,4)+'.'): ''}${+owo.slice(4,7) ? (owo.slice(4,7)+'.'):'' }${owo.slice(-3)}`
})

Handlebars.registerHelper('ifa', function (aString) {
  let o = 'text'
  if(aString == 'String'){
    o = 'text'
  }else if(aString == 'Number'){
    o = 'number'
  }else if(aString == 'Boolean'){
    o = 'checkbox'
  }

  return o
})

Handlebars.registerHelper('list', function (aString) {
  let o = ''
  // console.log('::a::'+aString+Object.keys(aString._doc));
  for (let i = 0; i < Object.keys(aString._doc).length; i++) {
    o += (`<li class="list-group-item"><span class="text-primary">${Object.keys(aString._doc)[i]}</span>&nbsp: ${aString[Object.keys(aString._doc)[i]]}</li>`)
  }
  return new Handlebars.SafeString(o)
})


Handlebars.registerHelper('objinobj', function(obj, parametro) {
  console.log(obj);
  return obj[parametro]
});

Handlebars.registerHelper('objinobj2', function(obj, parametro, valor, parametro2) {

  return obj.filter(e=>{
    return e[parametro] == valor
  })[0] ? obj.filter(e=>{
    return e[parametro] == valor
  })[0][parametro2] : undefined
});

Handlebars.registerHelper('deCartones', function(array, serie) {
  
  return array.filter((e)=>{
    return e['serial'] == serie
  })
});

Handlebars.registerHelper('ifif', function(o,e) {
  // console.log(o, e);
  return o !== e
});

Handlebars.registerHelper('ififnet', function(o,e) {
  // console.log(o, e);
  return o == e
});

Handlebars.registerHelper('cartonesAdmin', function(user, cartones, serial) {
  let cartonesUser = cartones.filter((e)=>{
    return e.propietario_correo == user._id
  })
  let enJuego = cartonesUser.filter((e)=>{
    return e.serial == serial || e.serial == 28
  })

  return enJuego
});