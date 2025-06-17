import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import 'dotenv/config'
// import { userRouter } from "./routes/user_routes.js"
import { paymentRouter } from "./routes/payment_routes.js"


const app = express()
app.use(express.json());

const PORT = process.env.PORT || 7508

const mongoURI = process.env.MONGO_URI

export const secret = process.env.JWT_SECRET

// export const SMTP_USER = process.env.SMTP_USER

// export const SMTP_PASS = process.env.SMTP_PASS



 
// app.use('/api/v1/users', userRouter)
app.use('/api/v1', paymentRouter)


await mongoose.connect(mongoURI)

app.listen(PORT, () => {
   console.log(`Server is up on port ${PORT}`)
})

