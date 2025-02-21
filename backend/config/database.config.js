const mongoose = require("mongoose")
require("dotenv").config()
const Database_URL = process.env.DATABASE_URL

 const DatabaseConnection = mongoose.connect(Database_URL)
 module.exports = DatabaseConnection