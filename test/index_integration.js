process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();

chai.use(chaiHttp);

describe('Index', () => {
    describe('GET /', () => {
        it('Should return status 200 and a string.', (done) => {
            chai.request(server)
                .get("/")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.be.a("string");

                    done();
                });
        });
    });
});