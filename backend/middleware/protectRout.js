const jwt = require("jsonwebtoken")

const protectrout=(req,res,next)=>
{
    const token = req.body.token;
   
    if(!token)
        {
            return res.status(401).json({message:'Acsses denied not token provided'})

        }
    try
    {
      
        const decoded =jwt.verify(token,process.env.secratkey)

        req.user =decoded;
        console.log(req.user);
        next()
    }
    catch(error)
    {
        res.status(401).json({message:'Invalid or expired token'})
    }
}
module.exports=protectrout;
