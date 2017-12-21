const express = require('express')
const mongoose = require('mongoose')
const chalk = require('chalk')
const authRouter = require('./routes/auth')
const profileRouter = require('./routes/profile')
const passportSetup = require('./config/auth-setup')
const keys = require('./config/keys')
const cookieSession = require('cookie-session')
const passport = require('passport')

mongoose.Promise = global.Promise

const app = express()
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}))

// initialize passport
app.use(passport.initialize())
app.use(passport.session())

mongoose.connect(keys.mongodb.url, () => {
    console.log(chalk.green(' Database connection done succefully'))
})

app.set('view engine', 'ejs')
app.use('/auth', authRouter)
 app.use('/profile', profileRouter)

app.get('/', (req, res) => {
    res.render('home', {user: req.user})
})

app.listen(3000, (req, res) => {
    console.log('App started.')
})