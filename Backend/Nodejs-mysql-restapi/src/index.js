import express, { application } from 'express'
import LoginRoutes from './routes/Login.routes.js'
import indexRoutes from './routes/index.routes.js'

const app = express()

app.use(express.json())

app.use(indexRoutes)
app.use(LoginRoutes)


app.listen(3000)
console.log('Server running on port 3000')