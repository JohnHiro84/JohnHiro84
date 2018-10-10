const express = require('express');
const router = express.Router();
const recordController = require('../controllers/records');


router.get('/loggedinUserSearchbyDateForm2', recordController.records_search);
router.post('/loggedinUserSearchbyDateForm2', recordController.records_search_go);
router.get('/loggedinUser/:userId', recordController.all_one_users_exercises);
router.get('/postUserExercise', recordController.post_exercise_begin);
router.post('/postUserExercise', recordController.post_exercise);

//the router we made can be exported
module.exports = router;
