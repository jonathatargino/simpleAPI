const { listUsers, getUserById, createUser, uptadeUser, deleteUser } = require("./controllers/UserControllers");

module.exports = [
  {
    endpoint: '/users',
    method: 'GET',
    handler: listUsers,
  },
  {
    endpoint: '/users/:id',
    method: 'GET',
    handler: getUserById,
  },
  {
    endpoint: '/users',
    method: 'POST',
    handler: createUser,
  },
  {
    endpoint: '/users/:id',
    method: 'PUT',
    handler: uptadeUser,
  },
  {
    endpoint: '/users/:id',
    method: 'DELETE',
    handler: deleteUser,
  },
]