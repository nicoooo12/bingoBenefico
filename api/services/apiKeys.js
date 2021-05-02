const config = require('../config')
const boom = require('@hapi/boom')
function getApiKey({ token }) {
  if(token === config.publicApiKeyToken){
    console.log('public');
    return [
      'signin:auth',
      'signup:auth',
      'read:movies',
      'read:user-movies',
      'create:user-movies',
      'delete:user-movies'
    ]
  }else if(token === config.adminApiKeyToken) {
    return [
      'signin:auth',
      'signup:auth',
      'read:movies',
      'create:movies',
      'update:movies',
      'delete:movies',
      'read:user-movies',
      'create:user-movies',
      'delete:user-movies'
    ]
  }
  return boom.badRequest('token not valid');
}

module.exports = {
  getApiKey
};