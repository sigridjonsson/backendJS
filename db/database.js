const mongo = require("mongodb").MongoClient;
const config = require("./config.json");
const collectionName = "crowd";

const database = {
    getDb: async function getDb () {
        dsn = "mongodb://localhost:27017/test" ;

        if (process.env.NODE_ENV !== 'test') {
            let dsn = `mongodb+srv://${config.username}:${config.password}@cluster0.j9zvn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
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
