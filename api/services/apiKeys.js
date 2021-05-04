const config = require('../config')
const boom = require('@hapi/boom')

function getApiKey({ token }) {
  if(token === config.publicApiKeyToken){
    return [
      'signin:auth',
      'signup:auth',
      'create:myOrden',
      'create:canvasOrden',
      'read:myOrden',
      'update:myOrden',
      'deleted:myOrden',
      'read:myCarton',
    ]
  }else if(token === config.adminApiKeyToken) {
    return [
      'signin:auth',
      'signup:auth',
      'create:myOrden',
      'create:orden',
      'create:canvasOrden',
      'read:myOrden',
      'read:ordenId',
      'read:ordenes',
      'read:canvas',
      'read:myCanvas',
      'update:myOrden',
      'update:orden',
      'deleted:myOrden',
      'deleted:orden',
      'end:orden',
      'create:carton',
      'read:myCarton',
      'read:cartonUser',
      'read:cartonById',
      'read:cartones',
      'deleted:carton',
    ]
  }
  return boom.badRequest('token not valid');
}

/**
 create:
 read:
 update:
 deleted:
 */

module.exports = {
  getApiKey
};