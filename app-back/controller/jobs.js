const mdbconn = require('../lib/utils/mongo.js');

function getJobs() {
  return mdbconn.conn().then((client) => {
    return client.db('retointegracion').collection('jobs').find({}).toArray();
  });
}

function insertJob(job) {
  return mdbconn.conn().then((client) => {
    return client.db('retonntegracion').collection('jobs').insertOne(job); // Si no se provee un ID, este será generado automáticamente
  });
}

module.exports = [getJobs, insertJob];