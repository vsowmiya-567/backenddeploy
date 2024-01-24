import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
    studentName :{
        type : String,
        required : true,
        maxlength : 30,

    },
    email : {
        type : String,
        trim : true,
        unique : true,
        required : true
    },
    course:{
        type: String,
        required: true
    },
    ismentor:{
        type:Boolean,
        default:false
    },
    mentorId:{
        type:mongoose.Types.ObjectId
    },
    previousmentorId:{
        type:mongoose.Types.ObjectId
    }
})

const student = mongoose.model('student',studentSchema)

export default student;

