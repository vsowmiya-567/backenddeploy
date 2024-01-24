import mongoose from "mongoose";
import mentor from "../Models/mentor.schema.js";
import student from "../Models/Student.schema.js";

//create mentors - POST

export const createMentor = async (req, res) => {
    try {
        const newMentor = new mentor(req.body)
        await newMentor.save()
        const name = newMentor.mentorName
        // console.log("name",name);
        res.status(200).json({
             message: `Mentor ${name} Created Successfully✨`, 
             data: newMentor 
            })
    } catch (error) {
        res.status(500).json({ error: "Error in create Mentor" })
    }
}

//getAll mentors - GET

export const getAllMentors = async (req, res) => {
    try {
        const allMentor = await mentor.find()
        res.status(200).json(allMentor)
    } catch (error) {
        res.status(500).json({ error: "Error in get all mentors" })
    }
}

//assign a student to mentor - PUT
export const updateMentor = async (req, res) => {
    try {
        let updateMentors = await mentor.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(req.body.mentorId) }, 
        { $set: { students: req.body.students } })
        res.status(200).json({
            message: "Student Assigned to Mentor Successfully ✨",
            data: updateMentors
        })
    } catch (error) {
        res.status(500).json({ error: "Error in create Mentor" })
    }
}

//one mentor and Add multiple Student -put

export const oneMentor = async (req, res) => {
    try {
        let oneMentor = await mentor.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(req.body.mentorId) },
         { $set: { students: req.body.students } })
         for(let i of req.body.students){
            let a = await student.findOne({ _id: new mongoose.Types.ObjectId(i)})
            await student.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(i) },
            {$set:{ ismentor: true,mentorId:req.body.mentorId,previousmentorId:a.mentorId}})
         }
        res.status(200).json({
             message: "Students Assigned to  One Mentor Successfully✨", 
             data: oneMentor
             })
    } catch (error) {
        res.status(500).json({ error: "Error in assign Multiple Student" })
    }
}

// show the previously assigned mentor for a particular student.
export const previousMentor = async (req, res) => {
    try {
        
         for(let i of req.body.students){
            let a = await student.findOne({ _id: new mongoose.Types.ObjectId(i)})
            await student.findOne({ _id: new mongoose.Types.ObjectId(i) },
            {previousmentorId:a.mentorId})
         }
        res.status(200).json({
             message: "previously assigned mentor", 
             data: a
             })
    } catch (error) {
        res.status(500).json({ error: "Error in get previous mentor" })
    }
}


// show all students for a particular mentor
export const showAllStudents = async (req,res)=>{
    try {
        const showAllStudents = await student.findOne({mentorId:new mongoose.Types.ObjectId(req.body.mentorId)})
        res.status(200).json({message:"students for a particular mentor",data:showAllStudents})
    } catch (error) {
        res.status(500).json({error:"Error in get All Students for a particular Mentor"})

    }
}