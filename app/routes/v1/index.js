var express = require('express');
// ルーティング
var router = express.Router();
var HistoryModel = require('../../models/historyModel.js');

router.use('/chat', require('./chat.js'));
router.use('/history', require('./history.js'));

module.exports = router;
