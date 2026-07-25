import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from './controllers/webhooks.js'
import companyRoutes from './routes/companyRoutes.js'
import connectCloudinary from './config/cloudinary.js'
import jobRoutes from './routes/jobRoutes.js'
import userRoutes from './routes/userRoutes.js'
import {clerkMiddleware} from '@clerk/express'


//Initialise Express
const app = express()

//Middlewares
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())

//DB connection
await connectDB()
await connectCloudinary()

//Routes
app.get('/',(req,res) => res.send("API is Working"))
app. get (" ", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.post('/webhooks',clerkWebhooks)
app.use('/api/company', companyRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/users', userRoutes)

//Port
const PORT = process.env.PORT || 8000

Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})



//token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNGEyODBkNmU3NWFiNmZkYzg3MWI3MyIsImlhdCI6MTc4NDAyNTYxOCwiZXhwIjoxNzg2NjE3NjE4fQ.cb_YAHI9AIypmvHDEclcZ5zPwDuWIaHM6Ofqui0W_Fk