import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import { userRouter } from "./routes/user_routes.js"
import { unitRouter } from "./routes/unit_routes.js"
import { PropertyRouter } from "./routes/property_routes.js"
import { mongoURI, PORT } from "./config/env.js"

import 'dotenv/config'
// import { userRouter } from "./routes/user_routes.js"
import { paymentRouter } from "./routes/payment_routes.js"
import { userRouter } from "./routes/user_routes.js"
import { unitRouter } from "./routes/unit_routes.js"
import { PropertyRouter } from "./routes/property_routes.js"
import { assignmentRouter } from "./routes/tenantAssignment_routes.js"

const app = express()
app.use(express.json());




 
// app.use('/api/v1/users', userRouter)
app.use('/api/v1', paymentRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/units',unitRouter)
app.use('/api/v1/properties', PropertyRouter)

app.use('/api/v1/tenants', assignmentRouter);


await mongoose.connect(mongoURI);

app.listen(PORT, () => {
   console.log(`Server is up on port ${PORT}`)
})

