const express = require('express');
const logger = require('morgan')
const bodyParser = require('body-parser');
const errorhandler = require('errorhandler')
const accounts = require('./routes/accounts.js')

let app = express()
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(errorhandler())
  
app.get('/accounts', accounts.getAccounts)
app.post('/accounts', accounts.addAccount)
app.put('/accounts/:id', accounts.updateAccount)
app.delete('/accounts/:id', accounts.removeAccount)

app.listen(3000)