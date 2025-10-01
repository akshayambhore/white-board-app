const User = require("../models/user")
const jwt = require("jsonwebtoken")

const addUser = async (req,res)=>
    {
        console.log("req hit")
        try
        {
            const {name,email,password } =req.body;

            const newUser = new User ({name , email, password});

            const savedUser = await newUser.save();
            res.status(200).json({savedUser,massage:"user ragisterd secsefully"})
        }
        catch (error)
        
        {
            res.status(400).json({eroor:error.message})
        }
    }
const getUser = async (req,res) =>
    {
        try
        {
            const{ email,password} =req.body;
            
            const user =await User.findOne({email:req.body.email});
            if(!user)
                {
                    return res.status(400).json({massage:"email not registerd"})
                }
               
            const isMatch = await user.comparePassword(password);

            if(!isMatch)
                {

                    return req.status(400).json({massage:"invalid password"})
                }
                
            
            const token = jwt.sign({id:user._id,email:user.email},process.env.secratkey,{expiresIn:'1h'})
           
           
            res.status(200).json({token:token,email:user.email,name:user.name,massage:"login secsesfuly"});

        }
        catch (error)
        {
            res.status(400).json({error:error.message})
        }
    }
module.exports={addUser,getUser}
