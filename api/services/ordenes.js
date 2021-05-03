const store = require('../libs/mongoose')
const canvasServices = require('./canvasUrl')
const table = 'ordenes'

async function createOrden(
  compra, // Array
  totalPago, //Number
  tipoDePago, // String
  user // String
){
  try{

    let newOrden = await store.post(table,{
      compra,
      totalPago,
      tipoDePago,
      estado: 2, // 0: finalizado, 1: en revisión, 2: incida
      canvasUrl: false, // estado = 2 -> no canvas url
      user
    }) 

    return newOrden

  }
  catch(err){

    throw new Error(err)

  }
}

async function addCanvasUrl(id, canvasUrl){

  try {

    await canvasServices.createCanvasUrl(id, canvasUrl)
    
    let editOrden = await store.put(table, {user: id}, {
      canvasUrl: true,
      estado: 1, // 0: finalizado, 1: en revisión, 2: incida
    })

    return editOrden

  } catch (err) {
    
    throw new Error(err)

  }

}

async function getCanvasOrden(id){

  try {
    
  } catch (err) {
    
    throw new Error(err)

  }

}

async function getOrdenes(){
  try {
    
    let getOrdenes = await store.get(table, {})

    return getOrdenes

  } catch (err) {
    
    throw new Error(err)

  }
}

async function getOrden(id){

  try {
    
    let getOrden = await store.get(table, {
      user: id.id,
    })

    return getOrden

  } catch (err) {
    
    throw new Error(err)

  }

}

async function editOrden(id, data){
  try {
    let editOrden = await store.put(table, id, data)

    return editOrden

  } catch (err) {
    
    throw new Error(err)

  }
}

async function cancelOrden(id){

  try {
    let deletedOrden = await store.delt(table, id)

    return deletedOrden

  } catch (err) {
    
    throw new Error(err)

  }

}

async function terminarOrden(id){
  
  try {
    
    //cambiar el estado 
    let editOrden = await store.put(table, id, {
      estado: 0, 
    })

    //crea los cartones

    //crear pdfs

    //manda el correo con los pdfs

    //retornar
    return editOrden

  } catch (err) {
   
    throw new Error(err)

  }

}

module.exports = {
  createOrden,
  addCanvasUrl,
  getCanvasOrden,
  getOrdenes,
  getOrden,
  editOrden,
  cancelOrden,
  terminarOrden,
}