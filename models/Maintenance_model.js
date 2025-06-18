//import mongoose 
import mongoose from 'mongoose'
import normalize from 'normalize-mongoose'
 //Define a schema for the maintenance model
 export const maintenanceSchema = new mongoose.Schema({
    Block: String,
    issue: String,
    dateRequested: Date,
    scheduledDate: Date,
    status: {
        type: String, 
        enum: ['Pending', 'Scheduled', 'Completed'], 
        default: 'Pending'
    }

 });
 maintenanceSchema.plugin(normalize);
 export const Maintenance = mongoose.model('Maintenance', maintenanceSchema);