import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import 'dotenv/config'
import { userRouter } from "./routes/user_routes.js"
import { unitRouter } from "./routes/unit_routes.js"
import { PropertyRouter } from "./routes/property_routes.js"


const app = express()

const PORT = process.env.PORT || 7508

const mongoURI = process.env.MONGO_URI

export const secret = process.env.JWT_SECRET

// export const SMTP_USER = process.env.SMTP_USER

// export const SMTP_PASS = process.env.SMTP_PASS

app.use(express.json())

app.use(cors());

app.use('/api/v1/users', userRouter)
app.use('/api/v1/units',unitRouter)
app.use('/api/v1/properties', PropertyRouter)


await mongoose.connect(mongoURI)

app.listen(PORT, () => {
   console.log(`Server is up on port ${PORT}`)
})

