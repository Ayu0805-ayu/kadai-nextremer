var express = require('express');
var router = express.Router();
var HistoryModel = require('../../models/historyModel.js');

router.get('/list', function (req, res) {
    HistoryModel
        .find({},
    {user_input: 1, bot_response: 1, response_timestamp: 1,input_timestamp: 1, _id: 0}
)
        .sort({ response_timestamp: -1})
        .limit(10)
        .then(
          function (histories) {
            res.json(histories);
        });

});

module.exports = router;
