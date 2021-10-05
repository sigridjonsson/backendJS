const jwt = require('jsonwebtoken');
const config = require('../db/config.json');

const auth = {
    checkToken: function(req, res, next) {
        const token = req.headers['x-access-token'];
    
        if (token) {
            jwt.verify(token, config.secret, function(err, decoded) {
                if (err) {
                    return res.status(500).json({
                        errors: {
                            status: 500,
                            source: req.path,
                            title: "Failed authentication",
                            detail: err.message
                        }
                    });
                }
    
                req.user = {};
                req.user.email = decoded.email;
    
                return next();
            });
        } else {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: req.path,
                    title: "No token",
                    detail: "No token provided in request headers"
                }
            });
        }
    }
}

module.exports = auth;