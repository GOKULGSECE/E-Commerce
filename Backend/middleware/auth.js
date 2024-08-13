const jwt = require('jsonwebtoken');

const auth = (req,res,next)=>{
    const header = req.header('Authorization');
    if(!header) {
        return res.status(401).json({message:"Access denied. No header provided."});
    }
    const token = header.split(" ")[1]
    if(!token){
        return res.status(401).json({message:"Access denied. No token provided."});
    }
    try{
        const decoded = jwt.verify(token,"service_Token");
        req.user = decoded;
        next();
    }catch(err)   
    {
        res.status(401).json({message:{err}})
    }
}

module.exports = auth;

