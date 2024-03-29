//require('dotenv').config()

const invite = {
    send: function send(req) {
        const sgMail = require('@sendgrid/mail');

        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const email = req.body.recipient;

        const msg = {
            to: `${email}`,
            from: 'toss21@student.bth.se',
            subject: 'Invitation from Text Editor',
            text: `Document has shared with you at Text Editor.\n
            Register/login to access the document https://www.student.bth.se/~toss21/editor`
        };

        sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent');
            })
            .catch((error) => {
                console.error(error);
            });
    }
};

module.exports = invite;
