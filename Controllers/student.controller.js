import student from "../Models/Student.schema.js";
import mongoose from "mongoose";


//create student-POST

export const createStudent = async(req,res)=>{
    try {
        const newStudent = new student(req.body)
        await newStudent.save()
       
        const name = newStudent.studentName
        // console.log("name", name);
        res.status(200).json({message:`Student ${name} Created Successfully`,data:newStudent})

    } catch (error) {
        res.status(500).json({error:"Error in create Student"})
    }
}

// get all student details - GET

export const getAllStudents = async(req,res)=>{
    try {
        const allStudentDetails = await student.find()
        res.status(200).json({message:"All Students Details",data:allStudentDetails})
    } catch (error) {
        res.status(500).json({error:"Error in get Students Details"})
    }
}

//student who has a mentor should not be shown in List - put
export const updateStudent = async(req,res)=>{
    try {
        let updateStudents = await student.findOne({_id:new mongoose.Types.ObjectId (req.body.studentId)})
        if(updateStudents.ismentor){
        return res.status(500).json({message:"Mentor Already Assigned For This Student"})
        }
        res.status(200).json({message:"Mentor not assigned for this student",data:updateStudents})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Error in get Students Details"})

    }
}

// // show all students for a particular mentor
// export const showAllStudents = async (req,res)=>{
//     try {
//         const showAllStudents = await student.findOne({mentorId:new mongoose.Types.ObjectId(req.body.mentorId)})
//         res.status(200).json({message:"students for a particular mentor",data:showAllStudents})
//     } catch (error) {
//         res.status(500).json({error:"Error in get All Students for a particular Mentor"})

//     }
// }