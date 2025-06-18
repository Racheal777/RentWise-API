import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import { userRouter } from "./routes/user_routes.js"
import { unitRouter } from "./routes/unit_routes.js"
import { PropertyRouter } from "./routes/property_routes.js"
import { mongoURI, PORT } from "./config/env.js"


const app = express()


app.use(express.json())

app.use(cors());

app.use('/api/v1/users', userRouter)
app.use('/api/v1/units',unitRouter)
app.use('/api/v1/properties', PropertyRouter)


await mongoose.connect(mongoURI)

app.listen(PORT, () => {
   console.log(`Server is up on port ${PORT}`)
})

