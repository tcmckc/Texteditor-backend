const sinon = require('sinon');
const { expect } = require('chai');
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('../routes/invite');
const inviteModel = require('../models/invite');
const { describe, it, beforeEach } = require('mocha');

describe('POST /invite', () => {
    let app;

    beforeEach(() => {
        app = express();
        app.use(bodyParser.json());
        app.use('/', router);
    });

    it('return data if recipient is present', async () => {
        const inviteModelStub = sinon.stub(inviteModel, 'send').returns({ foo: 'bar' });
        const payload = { recipient: 'test@example.com' };

        const response = await request(app)
            .post('/')
            .send(payload)
            .expect(201)
            .expect('Content-Type', /json/);

        expect(response.body).to.eql({ data: { foo: 'bar' } });

        inviteModelStub.restore();
    });

    it('return error message if recipient is missing', async () => {
        const response = await request(app)
            .post('/')
            .send({})
            .expect(400)
            .expect('Content-Type', /json/);

        expect(response.body).to.eql({
            errors: {
                message: 'Email is missing.',
            },
        });
    });

    it('call send function', () => {
        const req = {
            body: {
                recipient: 'test@example.com',
                title: 'Test'
            }
        };

        const res = {
            status: sinon.spy(),
            json: sinon.spy()
        };

        const sendSpy = sinon.spy(inviteModel, 'send');

        inviteModel.send(req, res);
        expect(sendSpy.calledOnce).to.be.true;
    });
});
