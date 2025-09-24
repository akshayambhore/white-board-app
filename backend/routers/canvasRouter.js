const express = require('express')
const protectrout = require("../middleware/protectRout")
const { getCanvases, loadCanvas, createCanvas, updateCanvas, deleteCanvas, shareCanvas, removeShareCanvas } = require("../controllers/canvasController");
const router = express.Router();
router.get("/list",protectrout,getCanvases);
router.get("/load/:id",protectrout,loadCanvas);
router.post("/create",protectrout,createCanvas)
router.put("/update",protectrout,updateCanvas)
router.delete("/delete/:canvasid",protectrout,deleteCanvas)
router.put("/share/:id",protectrout,shareCanvas);
router.put("/remove/:id",protectrout,removeShareCanvas)
module.exports = router;
