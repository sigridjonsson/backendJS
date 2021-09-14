process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();

const database = require("../db/database.js");

chai.use(chaiHttp);

describe('Documents', () => {
    describe('GET /documents', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/documents")
                .end((err, res) => {
                    res.should.have.status(200);

                    done();
                });
        });
    });
});