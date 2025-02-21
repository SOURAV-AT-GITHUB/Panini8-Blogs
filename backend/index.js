const express = require("express")
const cors = require("cors")
require("dotenv").config()
const DatabaseConnection = require("./config/database.config")
const UserRouter = require("./routes/user.route")
const PORT = process.env.PORT || 3001
const app = express()
app.use(express.json())
app.use(cors())
app.use("/user",UserRouter)

app.get("/",(req,res)=>{
    res.json({message:"Server running fine."})
})



app.listen(PORT,async()=>{
    try {
        console.log(`Server running on ${PORT}`)
        await DatabaseConnection
        console.log("Database connected")
    } catch (error) {
        console.log('Failed to connect to database',error.message)
    }
})