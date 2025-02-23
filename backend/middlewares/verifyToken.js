require("dotenv").config();
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = function verifyToken(req, res, next) {
  try {
    
    const token = req.headers.authorization?.split(" ")[1] || null;
    if(!token) return res.status(401).json({message:"Please login first"})
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err)
        return res.status(401).json({ message: "Invalid or expired token." });
      req.user = decoded;
      next();
    });
  } catch (error) {
    
    return res
      .status(500)
      .json({ message: "Authentication failed, please login again." });
  }
};
