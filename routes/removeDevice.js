const express = require('express');
const controller = require('../controllers/removeDevice');
const router = express.Router();

router.patch('/removeDevice', controller.removeDevice)

module.exports = router;
