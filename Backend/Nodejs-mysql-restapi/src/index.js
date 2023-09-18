import express, { application } from 'express'
import LoginRoutes from './routes/Login.routes.js'
import indexRoutes from './routes/index.routes.js'
import UsersRoutes from './routes/Users.routes.js'
import ProductsRoutes from './routes/Products.routes.js'
import CartRoutes from './routes/Cart.routes.js'
import InvoiceRoutes from './routes/Invoice.routes.js'
import ReviewsRoutes from './routes/Reviews.routes.js'

const app = express()

app.use(express.json())

app.use(indexRoutes)
app.use('/api', LoginRoutes)
app.use('/api', UsersRoutes)
app.use('/api', ProductsRoutes)
app.use('/api', CartRoutes)
app.use('/api', InvoiceRoutes)
app.use('/api', ReviewsRoutes)

app.use((req, res, next) => {
    res.status(404).json({ message: 'endpoint not found'})
})


app.listen(3000)
console.log('Server running on port 3000')