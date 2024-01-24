import mongoose, { Schema } from "mongoose";


const mentorSchema = mongoose.Schema({
    
    mentorName : {
        type:String,
        required : true,
        maxlength : 30,
        trim : true
    },
    email : {
        type : String,
        trim : true,
        unique : true,
        required : true
    },
    students:{
        type:[]
        
    }
   
    })

const mentor = mongoose.model('mentor',mentorSchema)

export default mentor;