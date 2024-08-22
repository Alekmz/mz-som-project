import express, { Application } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes'
import path from 'path';

dotenv.config()

const app: Application = express()
const PORT = 3000

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use(routes)

app.listen(PORT, () => {
  console.log(`API iniciada na porta ${PORT}`)
})

export default app
