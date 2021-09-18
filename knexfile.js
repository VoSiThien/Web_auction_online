const environment = require('./environments/environment')
require('dotenv').config()

module.exports = {
  development: {
    client: 'pg',
    connection: environment.configDatabase.connectionString,
  }
};
