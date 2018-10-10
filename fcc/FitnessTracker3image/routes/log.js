const express = require('express');
const router = express.Router();
const logController = require('../controllers/log');


router.get('/checkIfLogdIn', logController.check_If);

//router.post('/', ImagesController.post_small_image );

router.get('/userIn', logController.User_In);
router.get('/login', logController.Log_In);
router.post('/login', logController.Post_Log_In);
router.get('/logout', logController.log_out);

//the router we made can be exported
module.exports = router;
