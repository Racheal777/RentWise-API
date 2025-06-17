import {Schema, model, trusted } from "mongoose";
import normalize from "normalize-mongoose"

const propertySchema = new Schema({
    name:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    type:{
        type: String,

    },
    description:{
        type: String,

    },
    image:{
        type: String,
    
    },
    user:{
        type: Schema.Types.ObjectId, ref: 'User'
    }

}, {timestamps: true})
propertySchema.plugin(normalize)
export const Property = model('Property', propertySchema)