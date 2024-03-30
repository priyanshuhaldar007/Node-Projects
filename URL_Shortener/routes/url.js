const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

router.post('/shorten',urlController.generateShortURL);
router.get('/:shortID',urlController.getShortURL);
router.get('/analytics/:shortID',urlController.getAnalytics);

module.exports = router;