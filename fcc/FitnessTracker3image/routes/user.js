const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');


router.get('/signupUser', userController.sign_up);
router.post('/signupUser', userController.post_sign_up);
router.get('/findAllUsers', userController.find_all_users);
router.get('/help', userController.the_help);

//the router we made can be exported
module.exports = router;
