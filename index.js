const express = require('express')
const app = express()
require('dotenv').config()
const moment = require('moment')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/Person')
app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      JSON.stringify(req.body),
    ].join(' ')
  })
)
app.get('/', (req, res) => {
  res.send('root route')
})
app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons)
  })
})
let requestCount = 0
app.get('/info', (req, res) => {
  requestCount++
  const date =
    moment().format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ') +
    ' (Eastern European Standard Time)'
  const message =
    '<p> Phonebook has info for ' + requestCount + ' people</p> ' + date
  res.send(message)
})
app.get('/api/persons/:id', (req, res,next) => {
  const id = req.params.id
  Person.findById(id)
    .then((data) => {
      if (data) {
        return res.status(200).send(data)
      }
      return res.status(404).end()
    })
    .catch((error) => {
      next(error)
    })
})
app.delete('/api/persons/:id', (req, res,next) => {
  const id = req.params.id
  Person.findByIdAndDelete(id)
    .then(() => {
      res.status(204).send()
    })
    .catch((error) => {
      next(error)
    })
})
app.put('/api/persons/:id', (req,res,next) => {
  const id=req.params.id
  const { name, number } = req.body
  Person.findByIdAndUpdate(
    id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((data) => {
      res.status(200).send(data)
    })
    .catch((error) => {
      next(error)
    })
})
app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body
  const newPerson = Person({
    name,
    number,
  })
  newPerson
    .save()
    .then((data) => {
      return res.status(201).send(data)
    })
    .catch((error) => {
      next(error)
    })
})
const errorHandller = (error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }
  if(error.name === 'ValidationError'){
    return res.status(400).send({ error: error.message })
  }
  next(error)
}
app.use(errorHandller)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
