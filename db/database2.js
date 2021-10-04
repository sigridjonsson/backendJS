const mongo = require("mongodb").MongoClient;
// const config = require("./config.json");
const collectionName = "users";

let config;
let username;
let password;

try {
    config = require("./config.json");
} catch (e) {
    console.log(e);
}

username = process.env.USERNAME || config.username;
password = process.env.PASSWORD || config.password;


const database = {
    getDb: async function getDb () {
        // let dsn = `mongodb+srv://${username}:${password}@cluster0.j9zvn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
        let dsn = "mongodb://localhost:27017/documents";

        if (process.env.NODE_ENV === 'test') {
            dsn = "mongodb://localhost:27017/test" ;
        }

        const client  = await mongo.connect(dsn, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = await client.db();
        const collection = await db.collection(collectionName);

        return {
            collection: collection,
            client: client,
        };
    }
};

module.exports = database;
