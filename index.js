
const express = require('express')
var cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")

const app = express()
const port = 3000

require('dotenv').config()

const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());

app.use(cookieParser())

var checkAuth = (req, res, next) => {
  if (req.cookies.nToken === undefined || req.cookies.nToken === null) {
    req.user = null
  } else {
    var token = req.cookies.nToken
    var decodedToken = jwt.decode(token, { complete: true }) || {}
    req.user = decodedToken.payload
  }

  next()
}
app.use(checkAuth)

app.use(express.static(__dirname + "/public"))

app.engine('handlebars', exphbs({ defaultLayout: 'layout', handlebars: allowInsecurePrototypeAccess(Handlebars) }))

app.set('view engine', 'handlebars')

// Set db
require('./data/doto-db');

require('./controllers/auth')(app)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app