const express = require('express');
const router = express.Router();

// Controller
const { imgUpload } = require('./../../controllers/fileUpload_controller.js');
const { signUp } = require('./../../controllers/user_controller.js')

// @route   POST api/signUp
// @desc    Create User

router.post('/', signUp);
router.post('/upload', imgUpload.single('file'), async (req,res) => {
  if (req.file) {
    await res.send(req.file.location)
  } else {
    res.send("https://neighbourly-user-images.s3-ap-southeast-2.amazonaws.com/splatter.jpg")
  }
});

module.exports = router;