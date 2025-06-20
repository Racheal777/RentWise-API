import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import cron from "node-cron"
import { unitRouter } from "./routes/unit_routes.js"
import { PropertyRouter } from "./routes/property_routes.js"
import { mongoURI, PORT } from "./config/env.js"

import 'dotenv/config'
// import { userRouter } from "./routes/user_routes.js"
import { paymentRouter } from "./routes/payment_routes.js"
import { userRouter } from "./routes/user_routes.js"



import { assignmentRouter } from "./routes/tenantAssignment_routes.js"
import maintenanceRoute from "./routes/Maintenance_route.js"
import notificationRoute from "./routes/notification_route.js"
import notifyRentDue from "./controllers/notification_controller.js"
import sendMaintenanceNotifications from "./controllers/Note_Maintenance_Con.js"
import { maintenanceRouter } from "./routes/maintenance_routes.js"

const app = express()
app.use(express.json());



 
// app.use('/api/v1/users', userRouter)
app.use('/api/v1', paymentRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/notification', notificationRoute)
app.use('/api/v1/units',unitRouter)
app.use('/api/v1/properties', PropertyRouter)
app.use('/api/v1/Maintenance', maintenanceRoute)

app.use('/api/v1/maintenance', maintenanceRouter)
app.use('/api/v1/tenants', assignmentRouter);


await mongoose.connect(mongoURI);

app.listen(PORT, () => {
   console.log(`Server is up on port ${PORT}`)
});

// Rent Reminder: Every day at 9:00 AM
cron.schedule('0 9 * * *', () => {
  console.log("Running scheduled rent reminder...");
  notifyRentDue(); // Call without req/res
});

//Maintenance Notification: Every day at 10:00 AM
cron.schedule('0 10 * * *', () => {
  console.log("Running scheduled maintenance notification...");
  sendMaintenanceNotifications(); // Call without req/res
});

