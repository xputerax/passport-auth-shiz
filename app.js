import express from 'express'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import cookieSession from 'cookie-session'
import morgan from 'morgan'

import local_auth from './auth/strategy/local.js'
import basic_auth from './auth/strategy/basic.js'
import digest_auth from './auth/strategy/digest.js'

const app = express()

const PORT = process.env.PORT || 3000

app.use(morgan('tiny'))

app.use(express.urlencoded({ extended: true }))

app.use(cookieParser('root'))

app.use(cookieSession({ secret: 'root' }))

app.use(passport.initialize())

passport.use(local_auth)
passport.use(basic_auth)
passport.use(digest_auth)

passport.serializeUser(function(user, done) {
  console.log('serializing user: ', user)
  done(null, {
    ...user,
    serialized: true
  });
});

passport.deserializeUser(function(user, done) {
  console.log('deserializing user', user)
  done('User not found', user);
});

app.get('/', function (req, res) {
  res.status(200).send({
    success: true,
    message: 'welcome'
  })
})

app.get('/login', function(req, res, next) {
  console.log('[get] /login user: ' + req.user)
  next()
}, function (req, res) {
  res.sendFile('views/login-form.html', {
    root: '.'
  })
})

app.post('/login', passport.authenticate('local', {
  failureRedirect: '/login',
  successRedirect: '/private',
  session: true
}))

app.get('/private', function(req, res, next) {
  next()
}, function (req, res) {
  console.log('user: ', req.user)
  console.log('session: ', req.session)

  res.send('welcome')
})

app.get('/login-basic', passport.authenticate('basic'))

app.listen(PORT, () => console.log(`Application running on port ${PORT}`))