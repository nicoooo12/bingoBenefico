const config = require('../config')
const boom = require('@hapi/boom')
/**
'create:orden',
'read:orden',
'read:ordenes',
'update:orden',
 */
function getApiKey({ token }) {
  if(token === config.publicApiKeyToken){
    return [
      'signin:auth',
      'signup:auth',
      'read:orden',
      'create:orden',
    ]
  }else if(token === config.adminApiKeyToken) {
    return [
      'signin:auth',
      'signup:auth',
      'read:orden',
      'read:ordenes',
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