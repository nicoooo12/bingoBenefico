const bcrypt = require('bcrypt');
const collection = 'users';
const store = require('../libs/mongoose')
const boom = require('@hapi/boom')


async function getUser({ email }) {
  const [user] = await store.get(collection, { email });
  return user;
}

async function createUser({ user }) {
  const { name, email, password } = user;
  const queriedUser = await getUser({ email });

  console.log(queriedUser);

  if (queriedUser){
    throw boom.badRequest('busy account')
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const createUser = await store.post(collection, {
    name,
    email,
    password: hashedPassword
  });

  return createUser._id;
}

module.exports = {
  createUser,
  getUser,
};