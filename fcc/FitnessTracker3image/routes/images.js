const express = require('express');
const router = express.Router();
const ImagesController = require('../controllers/images');


router.get('/', ImagesController.upload_small_image);

router.post('/', ImagesController.post_small_image );

router.get('/profile', ImagesController.show_small_image);


//the router we made can be exported
module.exports = router;
