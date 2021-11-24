const express = require('express');
const router = express.Router();

const { UrlController } = require('../controller');

router.post('/shortenurl', UrlController.newShortUrl);

router.get('/:urlCode', UrlController.redirectToURL);
router.get('/statistics/:urlCode', UrlController.urlStats);

module.exports = router;