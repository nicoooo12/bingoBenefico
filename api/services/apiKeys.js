const store = require('../libs/mongoose');
let collection = 'api-keys';

async function getApiKey({ token }) {
  const [apiKey] = await store.get(collection, { token });
  return apiKey;
}

module.exports = {
  getApiKey
};