const Canvas = require('../models/canvas');
const User = require('../models/user');
const mongoose = require("mongoose");

exports.getCanvases = async (req, res) => {
    try {
        const userId = req.user.id;

        const canvases = await Canvas.find(
            {
                $or: [{ owner: userId }, { shared: userId }]
            }).sort({ createdAt: -1 })
        res.status(200).json({ canvases });

    }
    catch (errar) {
        res.status(500).json({ error: "failed to factch the canvases", details: errar.message })
    }

}
exports.loadCanvas = async (req, res) => {
    try {
        const CanvasId = req.params.id;
        const userId = req.user.id;
        const canvas = await Canvas.findById(CanvasId);
        if (!canvas) {
            return res.status(403).json({ error: "Unouthorised to acsess the canvas" })
        }
        console.log(userId, canvas.owner)
        if (canvas.owner.toString() !== userId && !canvas.shared.includes(userId)) {
            return res.status(404).json({ error: "Unouthorised to acsess the canvas" })
        }
        res.status(200).json(canvas);

    }
    catch (error) {
        res.status(500).json({ error: "Failed to load canvas", details: error.message })
    }
}
exports.createCanvas = async (req, res) => {
    try {
        const userId = req.user.id;
        const newCanvas = new Canvas(
            {
                owner: userId,
                name:req.body.name,
                shared: [],
                elements: [],
            }
        )
        await newCanvas.save();

        res.status(200).json({ message: "Canvas created successfully", canvasId: newCanvas._id })
    }
    catch (error) {
        res.status(500).json({ error: "Failed To Create Canvas", details: error.message })
    }
}

exports.updateCanvas = async (req, res) => {
    try {
        const { canvasId, elements } = req.body;
        const userId = req.user.id;
        const canvas = await Canvas.findById(canvasId);
        if (!canvas) {
            return res.status(404).json({ error: "canvas not found" });
        }
        if (canvas.owner.toString() !== userId && !canvas.shared.includes(userId)) {
            res.status(403).json({ error: "Unotherosed to update this canvas" })
        }
        canvas.elements = elements
        await canvas.save();
        res.status(200).json({ message: "canvas updated secsesfuly" })

        return res.status(200)


    }
    catch (error) {
        res.status(500).json({ error: "failed to update canvas", details: error.message })
    }
}
exports.deleteCanvas = async (req, res) => {
    try {
        const userId = req.user.id;
        const canvasId = req.params.canvasid;
        const canvas = await Canvas.findById(canvasId);
        if (!canvasId) {
            return res.status(404).json({ error: "Canvas not found" })
        }
        if (canvas.owner.toString() != userId) {
            return res.status(403).json({ error: "only owner can delate the canvas " })
        }
        await Canvas.findByIdAndDelete(canvasId);
        res.status(200).json({ message: "canvas delaetad secsefuly" })
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete canvas", message: error.message })
    }
}
exports.shareCanvas = async (req, res) => {
    try {
        const { email } = req.body;
        const canvasId = req.params.id;
        const userId = req.user.id;

        const canvas = await Canvas.findById(canvasId);
        if (!canvas) {
            res.status(404).json({ error: "canvas not exist" })
        }
        const userToShare = await User.findOne({ email });
        if (!userToShare) {
            res.status(404).json({ error: "User with email not found" });
        }
        const idOfUser = new mongoose.Types.ObjectId(userToShare._id);

    
        if (canvas.owner.toString()!==userId)
            {
                res.status(403).json({error:"only the owner can share canvas"})
            }
        if(idOfUser.toString()===canvas.owner.toString())
            {
                res.status(400).json({error:"woner can not inclused in share"});
            }
        if(canvas.shared.includes(idOfUser))
            {
                res.status(400).json({error:"alrady shared with this user"});

            }
            canvas.shared.push(idOfUser);
            await canvas.save();
            res.status(200).json({message:"user added to share secsesfuly"})
    }
    catch (error)
    {
        res.status(500).json({error:"failed to share canvas ", message:error.message});

    }
}







exports.removeShareCanvas = async (req, res) => {
    try {
        const { email } = req.body;
        const canvasId = req.params.id;
        const userId = req.user.id;

        const canvas = await Canvas.findById(canvasId);
        if (!canvas) {
            res.status(404).json({ error: "canvas not exist" })
        }
        const userToShare = await User.findOne({ email });
        if (!userToShare) {
            res.status(404).json({ error: "User with email not found" });
        }
        const idOfUser = new mongoose.Types.ObjectId(userToShare._id);

    
        if (canvas.owner.toString()!==userId)
            {
                res.status(403).json({error:"only the owner can remove the usser from share"})
            }
       
        if(!canvas.shared.includes(idOfUser))
            {
                res.status(400).json({error:"user not prasent in shared"});

            }
            canvas.shared = canvas.shared.filter(id => id.toString() !== idOfUser.toString());
            await canvas.save();
            res.status(200).json({message:"user removed to share secsesfuly"})
    }
    catch (error)
    {
        res.status(500).json({error:"failed to remove share canvas ", message:error.message});
        
    }
}
