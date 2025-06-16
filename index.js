 import express from "express"

import mongoose from "mongoose"
import 'dotenv/config'
import { userRouter } from "./routes/user_routes.js"


 const app = express()


 const PORT = 7078

const mongoURI = process.env.MONGO_URI

 await mongoose.connect(mongoURI)


app.use(express.json())

 
app.use('/api/v1/users', userRouter)



 app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`)
 })

