const mongoose = require('mongoose');

let cacheDb = null;

exports.connectToDatabase = async () => {

  try {
    if (cacheDb) {
      return await cacheDb;
    }
    const connect = await mongoose.connect('mongodb://admin:admin123@ds245387.mlab.com:45387/serveless-db', {
      useCreateIndex: true,
      useNewUrlParser: true,
    });
    cacheDb = connect;
    return cacheDb;

  } catch (error) {
    console.log('DB no connection')
  }
}

