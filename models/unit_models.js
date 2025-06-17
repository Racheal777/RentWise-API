import {model, Schema} from "mongoose"
import normalize from "normalize-mongoose"

export const unitSchema = new Schema({
    propertyId:{
        type: Schema.Types.ObjectId, ref:"Property",
        required: true
        
    },
    
    unitNumber:{
        type: Number,
        required: true
    },

    rentAmount:{
        type: Number,
        required: true
    },

    status:{
        type: String,
        enum: ['available', 'occupied', 'maintenance'],
        default: 'available'
    },

    tenantId:{
        type: Schema.Types.ObjectId, ref:"User"
    },
}, {timestamps: true})
unitSchema.plugin(normalize)

export const Unit = model('Unit', unitSchema)
