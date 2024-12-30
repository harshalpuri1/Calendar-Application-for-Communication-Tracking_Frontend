const express = require('express');
const { getAllCommunications, createCommunication } = require('../controllers/communicationController');

const router = express.Router();

router.get('/getAllCommunications', getAllCommunications);
router.post('/createCommunication', createCommunication);

module.exports = router;
