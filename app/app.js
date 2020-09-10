// ライブラリ読み込み
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var path = require('path');
dbURL = {mongoDBのURL}
//dbURL = 'mongodb://localhost:27017/ExpressAPI'

// DBの設定
mongoose.Promise = global.Promise;
mongoose.connect(dbURL,{ useNewUrlParser: true , useUnifiedTopology: true } );
mongoose.connection.on('error', function(err) {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
});

app.use(express.static(path.join(__dirname, '../client/build')))
//body-parserの設定
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3001; // port番号を指定

var router = require('./routes/v1/');
app.use('', router);

//サーバ起動
app.listen(port);
console.log('listen on port ' + port);
