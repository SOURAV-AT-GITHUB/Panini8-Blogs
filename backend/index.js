const express = require("express")
const cors = require("cors")
require("dotenv").config()
const PORT = process.env.PORT || 3001
const app = express()
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.json({message:"Server running fine."})
})



app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
})