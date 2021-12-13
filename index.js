const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

let profilesDb = [];

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.post('/profile', (req, res) => {
    console.log('POST /profile: ', req.query.name);
    const profile = req.body;
    console.log(profile);
    if(profile.email){
        profilesDb.push(profile);
        res.send('Successfully added new profile!!');
    }else
    {
        res.status(400).send('Please provide a valid email address!!');
    }
});

app.get('/profile', (req, res) => {
    console.log('GET /profile: ', req.query.email);
    if (req.query.email) {
        console.log('request has come with parameters:' + req.query.email);
        const email = req.query.email;
        for (let profile of profilesDb) {
            if (profile.email.toLowerCase() === email.toLowerCase()) {
                res.json(profile);
                return;
            }
        }
        res.status(401).send('Email was not found in DB!!');
    } else {
        res.status(400).send('Please provide a valid Email address!!');
    }
});

app.delete('/profile', (req, res) => {
    console.log('DELETE /profile: ', req.query.email);
    if (req.query.email) {
        const email = req.query.email;
        for (let profile of profilesDb) {
            if (profile.email.toLowerCase() === email.toLowerCase()) {
                const index = profilesDb.indexOf(profile);
                if (index > -1) {
                    profilesDb.splice(index, 1);
                }
                res.json('Profile has been delete!');
                return;
            }
        }
        res.status(401).send('Email was not found in DB!!');
    } else {
        res.status(400).send('Please provide a valid Email address!!');
    }
});

app.get('/all-profiles', (req, res) => {
    console.log('GET /all-profile: ', req.query.name);
    res.send(profilesDb);
});

app.delete('/all-profiles', (req, res) => {
    console.log('DELETE /all-profile: ', req.query.name);
    profilesDb = [];
    res.send('All profiles successfully deleted!!');
});

app.listen(port, () => console.log(`Hemingway app listening on port ${port}!`));