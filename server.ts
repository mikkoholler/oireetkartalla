/* eslint-disable import/first */
import * as dotenv from 'dotenv'
dotenv.config()

import * as express from 'express'
import * as path from 'path'
import * as favicon from 'express-favicon'
import { db } from './db'

const app = express()
app.use(express.json())

const port = process.env.PORT || 5000
app.use(favicon(path.resolve('./build/favicon.ico')))

app.use(express.static(path.resolve('./build')))

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

app.get('/ping', (req, res, next) => {
  db.query('SELECT 1;')
    .then(() => {
      res.send('pong')
    })
    .catch(next)
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve('./build/index.html'))
})

app.post('/answers', (req, res) => {
  console.log('Got answers', req.body)
  res.send()
})
