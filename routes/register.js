var express = require('express');
var router = express.Router();
var config = require("../db/config.json");

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let database = require('../db/database2');

const jwtSecret = process.env.JWT_SECRET || config.secret;

router.get("/", async (req, res) => {
    let db = await database.getDb();
    const resultSet = await db.collection.find({}, {}).toArray();

    res.json(resultSet);
});

// POST ROUTER FOR LOGIN
router.post("/", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(401).json({
            errors: {
                status: 401,
                source: "/register",
                title: "Email or password missing",
                detail: "Email or password missing in request"
            }
        });
    }

    bcrypt.hash(password, 4, async function(err, hash) {
        if (err) {
            return res.status(500).json({
                errors: {
                    status: 500,
                    source: "/register",
                    title: "bcrypt error",
                    detail: "bcrypt error"
                }
            });
        }

        let db;

            try {
                db = await database.getDb();

                let doc = {
                    email: email,
                    password: hash,
                }

                await db.collection.insertOne(doc);

                return res.status(201).json({
                    data: {
                        message: "User successfully registered."
                    }
                });
            } catch (e) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/register",
                        title: "Database error",
                        detail: err.message
                    }
                });
            } finally {
                await db.client.close();
            }
        });
})

module.exports = router;