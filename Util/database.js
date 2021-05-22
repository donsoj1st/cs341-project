const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

let db;

const mongoConnect = callback => {
    mongodb.MongoClient.connect('mongodb+srv://donsoj1st:7851AdeSoji@cluster0.2h96s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
        .then(result => {
            console.log('connected');
            db = result.db();
            callback();
        })
        .catch(err => {
            console.log('failed');
            throw err;
        })
    
}

const getDb = () =>{
    if (db) {
        return db;
    }

    throw 'no databased found';
}
//module.exports = mongoConnect;
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
