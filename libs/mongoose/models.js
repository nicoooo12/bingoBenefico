const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mySchemaUsers = new Schema({
  nombre: String,
  apellido: String,
  correo: String,
  telefono: Number,
  compra:Boolean,
})

const mySchemaAuth = new Schema({
  password: String,
  id : String,
})

const mySchemaCartones = new Schema({
  propietario_correo: String,
  data: Array,
  serial: Number,
})

const mySchemacatalogos = new Schema({
  img: String,
  titulo: String,
  descripcion: String,
  premioBingito: String, 
  premioCompleto: String, 
  serie: Number,
  precio: Number,
  color:String,
  textoMedio:String,
})

const mySchemaEstados = new Schema({
  estamosJuegando: Boolean,
  initJuego: Boolean,
  premioJuego: String,
  serieJuego: Number,
  dataJuego: Array,
  tiradas: Number,
  bingos: Array,
  messajeEspera: String,
})

const mySchemaErrores = new Schema({
  type: String,
  stack: String,
  url: String,
  user: Object,
})

const mySchemaMetodoOtros = new Schema({
  id:String,
  monto:Number,
  pedido: Object,
  nombreApellido: String,
  regionCiudad: String,
  telefono: String,
  formaPago: String,
  iniciado: Boolean,
  fin: Boolean,
})

const mySchemaTransferencias = new Schema({
  id: String,
  imgDate: String,
  pedido: Object,
  ext:String,
  nombre:String,
  monto:Number,
  fin: Boolean,
})

const users = mongoose.model('users', mySchemaUsers)
const auths = mongoose.model('auths', mySchemaAuth)
const cartones = mongoose.model('cartones', mySchemaCartones)
const catalogos = mongoose.model('catalogos', mySchemacatalogos)
const estados = mongoose.model('estados', mySchemaEstados)
const errores = mongoose.model('errores', mySchemaErrores)
const metodoOtros = mongoose.model('metodoOtros', mySchemaMetodoOtros)
const transferencias = mongoose.model('transferencias', mySchemaTransferencias)

module.exports = {
  users,
  auths,
  catalogos,
  cartones,
  estados,
  errores,
  metodoOtros,
  transferencias,
}