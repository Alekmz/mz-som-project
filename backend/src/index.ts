import express, { Application } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes'
dotenv.config()

const app: Application = express()
const PORT = 3000

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(PORT, () => {
  console.log(`API iniciada na porta ${PORT}`)
})

export default app
