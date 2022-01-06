const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('', (req, res) => {
    res.render('index')
});

app.post('', (req, res) => {
    console.log(req.body);

    const myMail = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'kepa258@gmail.com',
            pass: 'test'
        }
    });

    const mailOptions = {
        from: req.body.email,
        to: 'kepa258@gmail.com',
        subject: `Message from ${req.body.email}`,
        text: req.body.message
    }

    myMail.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(error);
            res.send('error');
        }else{
            console.log('Email sent ' + info.response);
            res.send('success');
        }
    });

});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));