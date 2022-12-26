// database.js runs as test
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');
const { describe, before, it } = require('mocha');

chai.should();

chai.use(chaiHttp);

const database = require('../db/database.js');
const collectionName = "documents";

describe('Texteditor', () => {
    before(async () => {
        const db = await database.getDb();

        db.db.listCollections(
            {name: collectionName }
        )
            .next()
            .then(async function (info) {
                if (info) {
                    await db.collection.drop();
                }
            })
            .catch(function (err) {
                console.error(err);
            })
            .finally(async function () {
                await db.client.close();
            });
    });

    // Error: "promise executor should not be async"
    // before(() => {
    //     return new Promise(async (resolve) => {
    //         const db = await database.getDb();

    //         db.db.listCollections(
    //             {name: collectionName }
    //         )
    //             .next()
    //             .then(async function (info) {
    //                 if (info) {
    //                     await db.collection.drop();
    //                 }
    //             })
    //             .catch(function (err) {
    //                 console.error(err);
    //             })
    //             .finally(async function () {
    //                 await db.client.close();
    //                 resolve();
    //             });
    //     });
    // });

    describe('GET /texteditor', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get('/texteditor')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.data.should.be.an('array');
                    res.body.data.length.should.be.equal(0);

                    done();
                });
        });
    });

    describe('POST /add', () => {
        it('400 Returning error', (done) => {
            let newDoc = {
                name: "Down the Rabbit-Hole"
            };

            chai.request(server)
                .post("/add")
                .send(newDoc)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.an("object");
                    res.body.should.have.property("errors");
                    res.body.errors.should.have.property('message');
                    res.body.errors.message.should.equal("Name or text missing.");

                    done();
                });
        });
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get('/texteditor')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.data.should.be.an('array');
                    res.body.data.length.should.be.equal(0);

                    done();
                });
        });
        it('201 Creating new document', (done) => {
            let newDoc = {
                name: "Down the Rabbit-Hole",
                text: "Alice was beginning to get very tired"
            };

            console.log("newDoc", newDoc);

            chai.request(server)
                .post("/add")
                .send(newDoc)
                .end((err, res) => {
                    console.log("here!");
                    console.log("res.body", res.body);
                    res.should.have.status(201);
                    res.body.should.be.an("object");
                    res.body.should.have.property("data");
                    res.body.data.should.have.property('name');
                    res.body.data.should.have.property('text');
                    res.body.data.name.should.equal("Down the Rabbit-Hole");

                    done();
                });
        });
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get('/texteditor')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.data.should.be.an('array');
                    res.body.data.length.should.be.equal(1);

                    done();
                });
        });
    });
});
