import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', async (request, response) => {
  response.json({
    status: 'OK',
  })
})

app.listen(process.env.PORT)
