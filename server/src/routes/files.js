const express = require("express");
const router = express.Router();
const fileController = require("../controllers/fileController.js");

// Routes
router.get("/", fileController.view);
router.post("/", fileController.scan);
// router.get('/adduser', fileController.form);
// router.post('/adduser', fileController.create);
// router.get('/edituser/:id', fileController.edit);
// router.post('/edituser/:id', fileController.update);
// router.get('/viewuser/:id', fileController.viewall);
// router.get('/:id',fileController.delete);

module.exports = router;
