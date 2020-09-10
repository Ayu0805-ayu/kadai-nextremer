var express   = require('express');
var router    = express.Router();
var HistoryModel = require('../../models/historyModel.js');
var moment = require('moment-timezone');
var http = require('http');
var apikey = {openweathermapのAPIキー};
var req_weather='http://api.openweathermap.org/data/2.5/weather?q=Tokyo,jp&appid=' + apikey;
var bot_response='';

// 天気取得
http.get( req_weather, function(res_weather) {
  var body = '';
  res_weather.setEncoding('utf8');
  res_weather.on('data', function(chunk) {
    body += chunk;
  });
  res_weather.on('data', function(chunk) {
    res_weather = JSON.parse(body);

    if(res_weather.weather[0].main == 'Clear'){
      bot_response ="晴れです。";
    }
    else if(res_weather.weather[0].main == 'Clouds'){
      bot_response ="曇りです。";
    }
    else if(res_weather.weather[0].main == 'Snow'){
      bot_response ="雪です。";
    }
    else if(res_weather.weather[0].main == 'Rain'){
      //console.log(res_weather.weather[0].main);
      bot_response ="雨です。";
    }
    else if(res_weather.weather[0].main == 'Thunderstorm'){
      bot_response ="雷雨です。";
    }
    else if(res_weather.weather[0].main == 'Drizzle'){
      bot_response ="霧雨です。";
    }
    else{
      bot_response ="";
    }
  });
}).on('error', function(e) {
  console.log(e.message);
});

router.post('',function(req,res){

  // モデル作成．
  var History = new HistoryModel();

   if(req.body.user_input == 'こんにちは'){
    History.bot_response = 'こんにちは。';
   }
   else if(req.body.user_input == '今何時？'){
            History.bot_response = moment().tz("Asia/Tokyo").format("HH")+"時"+moment().tz("Asia/Tokyo").format("mm")+"分です。";

   }
   else if(req.body.user_input == '今日の東京の天気は？'){
            History.bot_response = bot_response;
   }
   else{ return;}

   History.user_input = req.body.user_input;
   History.input_timestamp = req.body.input_timestamp;
   History.setDate();

    // 保存処理
    History.save(function(err) {
        if (err){
            // エラーがあった場合エラーメッセージを返す
            res.send(err);
        } else {
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
        }
    });
});


//routerをモジュールとして扱う準備
module.exports = router;
