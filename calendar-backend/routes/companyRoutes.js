const express = require('express');
const { getAllCompanies, createCompany } = require('../controllers/companyController');

const router = express.Router();

router.get('/getAllCompanies', getAllCompanies);
router.post('/createCompany', createCompany);

module.exports = router;
