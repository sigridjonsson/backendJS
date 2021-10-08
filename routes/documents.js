var express = require('express');
var router = express.Router();

const data = require("../models/data.js");
const auth = require("../models/auth.js");


// GET ROUTER
router.get('/',
    (req, res, next) => auth.checkToken(req, res, next),
    (req, res) => data.getFunction(req, res)
);


// POST ROUTER
router.post('/',
    (req, res, next) => auth.checkToken(req, res, next),
    (req, res) => data.postFunction(req, res)
);

// PUT ROUTER
router.put("/:id",
    (req, res, next) => auth.checkToken(req, res, next),
    (req, res) => data.putFunction(req, res)
);


module.exports = router;
