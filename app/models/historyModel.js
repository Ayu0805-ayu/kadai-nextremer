var mongoose     = require('mongoose'); //mongoDBに接続するためのライブラリ
var Schema       = mongoose.Schema; //mongoDBのスキーマを作る
var moment = require('moment-timezone');

var HistorySchema   = new Schema({
    user_input :String,
    bot_response: String,
    response_timestamp: String,
    input_timestamp: String
});

HistorySchema.methods.setDate =  function() {
    //受信時刻をセット
    this.response_timestamp = moment().tz("Asia/Tokyo").format("YYYY-MM-DD HH:mm:ss");
};

// スキーマをモデルとしてコンパイルし、それをモジュールとして扱えるようにする
module.exports = mongoose.model('HistoryModel', HistorySchema);
