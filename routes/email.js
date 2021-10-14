var express = require('express');
var router = express.Router();

// POST ROUTER FOR EMAIL
router.post("/", async (req, res) => {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
    to: req.body.email,
    from: 'sigge.jonsson@hotmail.se',
    subject: 'Inbjudan till att redigera dokument',
    text: 'Detta är en inbjudan från ' + req.body.user + ' till att redigera ett dokument. Länken nedan tar dig till editorn där du kan registrera dig! http://www.student.bth.se/~sijn20/editor/',
    }
    sgMail
    .send(msg)
    .then(() => {
        console.log('Email sent')
    })
    .catch((error) => {
        console.error(error)
    })

})

module.exports = router;