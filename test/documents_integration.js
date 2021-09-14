process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();

const database = require("../db/database.js");

chai.use(chaiHttp);

describe('Documents', () => {
    describe('GET /documents', () => {
        it('Should return status 200', (done) => {
            chai.request(server)
                .get("/documents")
                .end((err, res) => {
                    res.should.have.status(200);

                    done();
                });
        });
    });

    describe('POST /documents', () => {
        it('Should return status 201 and a string.', (done) => {
            let info = {
                name: "Test dokument",
                text: "En test text"
            };

            chai.request(server)
                .post("/documents")
                .send(info)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.text.should.be.a("string");

                    done();
                });
        });
    });
});