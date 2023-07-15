const jwtService = require('../services/JwtServices')

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    // console.log(req.headers)
    console.log(authHeader)
    // clg

    if (!authHeader) {
        return res.status(400).json({ error: "Bad Request Sed life" })
    }

    const token = authHeader.split(" ")[1];
    try { 
        // console.log("Hi");
        const id = jwtService.verify(token) 
        if(!id){
            return res.status(401).json({error:"Unauth"})
        }
        next()
    }catch (e) {
        return res.status(401).json({error:"Unauth"})
    }

}

module.exports = auth