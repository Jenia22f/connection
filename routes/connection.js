const express = require('express');
const controller = require('../controllers/connection');
const router = express.Router();

router.post('/connect', controller.connect)

module.exports = router;
