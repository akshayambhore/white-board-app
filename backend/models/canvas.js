const mongoose = require("mongoose");


const canvasScema = new mongoose.Schema(
{
    owner : {type : mongoose.Schema.Types.ObjectId ,ref:"User",required:true},
    shared:[{type : mongoose.Schema.Types.ObjectId,ref:"User"}],
    elements:[{type:mongoose.Schema.Types.Mixed}],
    createdAt:{type : Date ,default:Date.now}
})
const Canvases = mongoose.model("Canvases",canvasScema);
module.exports = Canvases;
