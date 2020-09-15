const express = require('express');
const controller = require('../controllers/users');
const router = express.Router();

router.get('/user', controller.getUser)

module.exports = router;
