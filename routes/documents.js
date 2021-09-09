var express = require('express');
var router = express.Router();

let database = require('../db/database');

router.get("/", async (req, res) => {
    let db = await database.getDb();
    const resultSet = await db.collection.distinct('name');

    res.json(resultSet);
});

router.post("/", async (req, res) => {
    console.log(req.body);
    console.log(res.body);
    let doc = {
        name: req.body.name,
        text: req.body.text
    }

    let db = await database.getDb();
    result = await db.collection.insertOne(doc);

    if (result.acknowledged) {
        return res.status(201).send(`Added an object with id ${result.insertedId}`);
    }
})

module.exports = router;
