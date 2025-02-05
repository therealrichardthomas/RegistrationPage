const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const port = 8000;

// connecting to a mongodb database
mongoose.connect('mongodb://127.0.0.1:27017/signup');

// signup object
const signupSchema = new mongoose.Schema({
    username: String,
    signupEmail: String,
    signupPassword: String
});
const Signup = mongoose.model('Signup', signupSchema);

// login object
const loginSchema = new mongoose.Schema({
    loginEmail: String,
    loginPassword: String
});
const Login = mongoose.model('Login', loginSchema);

app.use("/public", express.static('public')); // adds the html and css files
app.use("/static", express.static('static')); // adds the images
app.use(express.urlencoded());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// creating an account with the signup info and storing it
app.post('/signup', (req, res) => {
    console.log("Received signup request:", req.body);
    var myData = new Signup(req.body);

    Signup.findOne({ signupEmail: req.body.signupEmail}).then(userFound => {
        console.log("User found:", userFound);
        if (userFound) {
            res.status(400).json({success: false, message: "An account associated with this email already exists."});
        } else {
            if (req.body.username != '' && req.body.signupEmail != '' && req.body.signupPassword != '') {
                myData.save().then(() => {
                    res.json({success: true, message: "Account created successfully.", redirect: "/"});
                }).catch(() => {
                    res.status(400).json({success: false, message: "Error in saving account."});
                });
            } else {
                res.status(400).json({success: false, message: "Please fill in the missing fields."});
            }
        }
    })
});

// verifying the login info and logging in 
app.post('/login', (req, res) => {
    var myData = new Login(req.body);

    Signup.findOne({ signupEmail: req.body.loginEmail, signupPassword: req.body.loginPassword }).then(userFound => {
        if (userFound) {
            res.json({success: true, message: 'Successful Login', redirect: '../public/home.html'});
        } else if (!req.body.loginEmail || !req.body.loginPassword) {
            res.status(400).json({success: false, message: 'Please fill in the missing fields.'});
        } else {
            res.status(400).json({success: false, message: 'Account not found. Please check your email and password'});
        }
    }).catch(() => {
        return res.status(400).json({success: false, message: 'Account not found.'});
    })
});

// starting the server
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);    
});
