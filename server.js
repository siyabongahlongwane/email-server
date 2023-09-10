const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({origin: '*'}));
app.use(express.json({ limit: 10000 }));

app.get('/api/test', (req, res) => {
    res.send('Hello World!');
})
app.post('/api/sendEmail', (req, res) => {
    const {from, to, subject, html} = req.body;
    
    let transporter = nodemailer.createTransport({
        host: "mail.webgooru.co.za",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'communications@webgooru.co.za',
            pass: 'onyinyechukwu98',
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    const mailOptions = {
        from, // sender address
        to, // list of receivers
        subject, // Subject line
        html // plain text body
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err){
            console.log(err)
            res.send({msg: 'Error sending email'});
        }

        else
            res.send({msg: 'Email sent successfully'});
    });
})

app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
})
