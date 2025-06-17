import { model, Schema } from "mongoose";
import normalize from 'normalize-mongoose'

const userSchema = new Schema({
    firstName:{
        type: String,
        require: true
    },
    lastName:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require:true
    },
    role:{
        type: String,
        enum:['admin','tenant']
    },
},{timestamps: true});

userSchema.plugin(normalize)
export const User = model('user',userSchema)