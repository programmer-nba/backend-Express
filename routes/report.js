var express = require('express');
var router = express.Router();
const adminAuth = require('../authentication/adminAuth')
const Report = require("../controllers/report.controller")

router.get('/team1/',adminAuth,Report.reportteam1)

module.exports = router;