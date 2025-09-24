const mongosh = require("mongoose")
mongosh.set("strictQuery" , true);
const url ="mongodb+srv://akshayambhore:%40Akshay7040@white-board-cluster.t6zhvjn.mongodb.net/?retryWrites=true&w=majority&appName=WHITE-BOARD-CLUSTER";
const params= {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
const ConectaToDatabase = async () =>
    {
        try 
        {
            await mongosh.connect(url,params)
            console.log("conected to database")
        }
        catch (err)
        {
            console.log(`Error conecting to the databse ${err}`)
        }
        
    };
module.exports=ConectaToDatabase