const bcrypt = require('bcrypt');
const collection = 'users';

async function getUser({ email }) {
  const [user] = await store.get(collection, { email });
  return user;
}

async function createUser({ user }) {
  const { name, email, password } = user;
  const hashedPassword = await bcrypt.hash(password, 10);

  const createUserId = await store.create(collection, {
    name,
    email,
    password: hashedPassword
  });

  return createUserId;
}

async function getOrCreateUser({ user }) {
  const queriedUser = await getUser({ email: user.email });

  if (queriedUser[0]) {
    return queriedUser;
  }

  await createUser({ user });
  return await getUser({ email: user.email });
}

module.exports = {
  getOrCreateUser,
  createUser,
  getUser,
};