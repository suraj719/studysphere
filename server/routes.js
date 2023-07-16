const express = require("express")
const { getAllQues, getQues, createQues, updateQues } = require("./controllers/questions")
const { updateCompl, updatetodo, getAllTasks,createTask,getTask,updateTask,deleteTask } = require('./controllers/tasks')

const router = express.Router()

router.route('/questions').get(getAllQues).post(createQues)
router.route('/questions/:id').get(getQues).put(updateQues)
router.route('/tasks').get(getAllTasks).post(createTask).patch(updateTask).put(updatetodo)
router.route('/task/:email').get(getTask).patch(updateTask)
router.route('/taskdel/:id').put(deleteTask)
router.route('/taskcompl/:id').put(updateCompl)
router.route('/taskupt/:id').put(updateTask)
// router.route('/login').post(loginUser)
// router.route('/forgot').patch(forgotPass)

module.exports = router