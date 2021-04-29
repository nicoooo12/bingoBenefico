const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mySchemaUsers = new Schema({
  name: String,
  email: String,
  // telefono: Number,
  password: String,
})

const mySchemaCartones = new Schema({
  user_id: String,
  data: Array,
  // tipo: Object,
  serie: Number,
})

const mySchemaCatalogos = new Schema({
  premios: Array,
  titulo: String,
  subTitulo: String,
  precio: Number,
  enVenta: Boolean
  // color: String,
  // emoji: String,
  // serie: Number,
})

const mySchemaOrdenes = new Schema({
  compra: Array,
  totalPago: Number,
  tipoDePago: String,
  estado: Number, // 0: finalizado, 1: en revisión, 2: incida
  canvasUrl: Boolean,
  user: String,
})

const mySchemaEstados = new Schema({
  
})

const mySchemaErrores = new Schema({
  type: String,
  stack: String,
  url: String,
  user: Object,
})


const users = mongoose.model('users', mySchemaUsers)
const auths = mongoose.model('auths', mySchemaAuth)
const cartones = mongoose.model('cartones', mySchemaCartones)
const catalogos = mongoose.model('catalogos', mySchemaCatalogos)
const ordenes = mongoose.model('ordenes', mySchemaOrdenes)

const estados = mongoose.model('estados', mySchemaEstados)
const errores = mongoose.model('errores', mySchemaErrores)

module.exports = {
  users,
  auths,
  catalogos,
  cartones,
  ordenes,
  estados,
  errores,
}