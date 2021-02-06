const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mySchemaUsers = new Schema({
  nombre: String,
  apellido: String,
  correo: String,
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
  serie: Number,
  precio: Number,
  color:String,
})

const users = mongoose.model('users', mySchemaUsers)
const auths = mongoose.model('auths', mySchemaAuth)
const cartones = mongoose.model('cartones', mySchemaCartones)
const catalogos = mongoose.model('catalogos', mySchemacatalogos)

module.exports = {
  users,
  auths,
  catalogos,
  cartones,
}