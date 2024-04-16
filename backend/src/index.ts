import express, { Application } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes'
dotenv.config()

const app: Application = express()
app.use(routes)
const PORT = 3001

app.use(cors())
app.use(express.json())

app.listen(PORT, () => {
  console.log(`API iniciada na porta ${PORT}`)
})

export default app
