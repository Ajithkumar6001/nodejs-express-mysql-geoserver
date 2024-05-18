const express = require('express');
const geoserverController = require('../controllers/layercontroller.js');

const router = express.Router();

router.post('/layer', geoserverController.createDatastore);

module.exports = router;
