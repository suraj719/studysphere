const Question = require("../models/questionmodel")

const getAllQues = async (req,res) => {
    try {
        const questions = await Question.find({})
        res.status(200).json({questions})
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

const getQues = async (req,res) => {
    try {
        const {id:id} = req.params;
        const ques= await Question.findOne({_id:id})
        if(!ques) {
            return res.status(404).json({msg:`no questions found with id ${id}`})
        }
        res.status(200).json({ques})
    } catch (error) {
        res.status(500).json({ msg:error})
    }
}

const createQues = async (req,res) => {
    const {title,name,description,image} = req.body;
    const totald = {
        title:title,
        name:name,
        description:description,
        image:image,
    }
    try {
        const response = await Question.create(totald)
        // await Post.create({image:base64});
        res.status(201).json({response})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const updateQues = async (req,res) => {
    // const comment = {
    //     answer: req.body.answer,
    //     answeredBy: req.body.answeredBy,
    // }
try {
    const {id:postid} = req.params
    const ques = await Question.findByIdAndUpdate(postid,{
        $push:{answers:req.body}
    },{
        new:true
    })
    res.status(200).json({ques})
} catch(error) {
    res.status(500).json({ msg:error})
}
    // try {
    //     const {id:postid} = req.params
    //     const task = await Question.findOneAndUpdate({_id:postid},{ $set: req.body }, {
    //         new:true,
    //         runValidators:true,
    //     })
    //     if(!task) {
    //         return res.status(404).json({msg:`no post found with id ${postid}`})
    //     }
    //     res.status(200).json({task})
    // } catch (error) {
    //     res.status(500).json({ msg:error})
    // }
}

// const deletePost = async (req,res) => {
//     try {
//         const {id:taskID} = req.params;
//         const task= await Post.findOneAndDelete({_id:taskID})
//         if(!task) {
//             return res.status(404).json({msg:`no posts found with id ${taskID}`})
//         }
//         res.status(200).json({task})
//     } catch (error) {
//         res.status(500).json({ msg:error})
//     }
// }

module.exports = {
    getAllQues,
    getQues,
    createQues,
    updateQues,
}