const express =require("express")    
const router = express.Router();

const {addUser, getUser} = require('../controllers/userController')
const validateUser = require ('../middleware/validation');


router.post('/login',getUser)
router.post('/register',validateUser,addUser)

module.exports=router;