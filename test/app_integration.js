process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();

chai.use(chaiHttp);

describe('App', () => {
    describe('GET /wrong', () => {
        it('Should return 404 as the route does not exist.', (done) => {
            chai.request(server)
                .get("/wrong")
                .end((err, res) => {
                    res.should.have.status(404);

                    done();
                });
        });
    });
});