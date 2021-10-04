let database = require('../db/database');

const data = {
    getFunction: async function(req, res, next) {
        let db = await database.getDb();
        const resultSet = await db.collection.find(
            {
                $or: [
                {allowed_users:"sigrid@sigrid.se"}
                ]
            } 
        ).toArray();

        res.json(resultSet);
    },
    putFunction: async function(req, res, next) {
        const ObjectId = require('mongodb').ObjectId;
        let filter = {_id: ObjectId(req.params.id)};
        let doc = {
            name: req.body.name,
            text: req.body.text
        }

        let db = await database.getDb();
        result = await db.collection.updateOne(
            filter,
            {$set: doc},
        );

        if (result.acknowledged) {
            return res.status(204).send();
        }
    },
    postFunction: async function(req, res, next) {
        let doc = {
            name: req.body.name,
            text: req.body.text,
            owner: req.body.owner,
            allowed_users: [
                req.body.allowed_users[0],
            ],
        }
    
        let db = await database.getDb();
        result = await db.collection.insertOne(doc);
    
        if (result.acknowledged) {
            return res.status(201).send(`Added an object with id ${result.insertedId}`);
        }
    }
}

module.exports = data;