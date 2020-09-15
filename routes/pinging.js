const express = require('express');
const controller = require('../controllers/pinging');
const router = express.Router();

router.post('/ping', controller.pinging)

module.exports = router;
