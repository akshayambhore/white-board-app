const {check,validationResult} =require("express-validator")
const validateUser =[
    check ('email').isEmail().withMessage("Invalid Email Format"),
    check ('password').isStrongPassword({
          minLength: 8,
    minLowercase: 0,
    minUppercase: 0,
    minNumbers: 0,
    minSymbols: 0
    }).withMessage("Password Must Contain At Leat 8 Charectors")
    ,
    (req,res,next)=>{
       const errors =  validationResult(req);
       if(!errors.isEmpty())
        {
            return res.status(400).json({errors:errors.array()})
        }
         console.log("validation midlware cvalled")
        next();

    }

]
module.exports=validateUser;
