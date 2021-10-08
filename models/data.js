let database = require('../db/database');
let database2 = require('../db/database2');

const data = {
    getFunction: async function(req, res) {
        let db = await database.getDb();
        const resultSet = await db.collection.find(
            {
                $or: [
                {allowed_users: req.user.email}
                ]
            } 
        ).toArray();

        res.json(resultSet);
    },
    getAll: async function(res=undefined) {
        let db = await database.getDb();
        let result = await db.collection.find().toArray();

        if (res === undefined) {
            return result;
        }

        return res.json({
            data: result
        });
    },
    getAllUsers: async function(res=undefined) {
        let db = await database2.getDb();
        let result = await db.collection.find().toArray();

        if (res === undefined) {
            return result;
        }

        return res.json({
            data: result
        });
    },
    putFunction: async function(req, res) {
        const ObjectId = require('mongodb').ObjectId;
        let filter = {_id: ObjectId(req.body.id)};
        let doc = {
            name: req.body.name,
            text: req.body.text,
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
    postFunction: async function(req, res) {
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