// const express = require("express")
// const connectDB = require("./Connection")
// const app =express()
// const cors = require("cors")
// const routes = require("./routes")
// require("dotenv").config()

// app.use(express.json())
// app.use(cors())
// app.use("/api/v1",routes)

// app.get("/",(req,res) => {
//     res.send("hello")
// })

// const port = process.env.PORT || 5000

// const start = async () => {
//     try {
//         await connectDB(process.env.MONGO_URL)
//         app.listen(port,console.log(`server is listening to port ${port}`))
//     } catch (error) {
//         console.log(error)
//     }
// }
// start()


const express = require("express")
const connectDB = require("./Connection")
const app =express()
const routes = require("./routes")
const cors = require("cors")
require("dotenv").config()
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json({limit: '50mb'}));
app.use(cors())
app.use('/api/v1',routes)

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port,console.log(`server is listening to port ${port}`))
    } catch (error) {
        console.log(error)
    }
}
start()