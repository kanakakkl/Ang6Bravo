const express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
cors = require('cors');

mongoose = require('mongoose'),
config = require('./src/config/DB');
const http = require('http');
const socketIO = require('socket.io');
const { MongoClient } = require("mongodb");


mongoose.Promise = global.Promise;
// mongoose.connect(config.DB).then(
// () => {console.log('Database is connected'), { useNewUrlParser: true } },
// err => { console.log('Can not connect to the database'+ err)}
// );

mongoose.connect(config.cosmosdb.url, {
    auth: {
      user: 'bravo',
      password: 'CCuDxfEmMorPYXCpezbv9Mya1e50lJ7BNbQRMhdxriAeVHTbYSwYpHLuCnYT2OEqYRTCQ5SJ39VcXxwa9dEVGw=='
    }
  })
  .then(
   () => {console.log('Database is connected'), { useNewUrlParser: true } },
   err => { console.log('Can not connect to the database'+ err)}
  );

const app = express();
const router = express.Router();

// app.use(bodyParser.urlencoded({ limit: '50mb' }));
// app.use(bodyParser.json({ limit: '50mb' }));

// body-parser middleware
app.use(bodyParser.json());

app.use(cors());
require('./middlewares/Router')(app);

app.use(express.static(path.join(__dirname + '/dist' )));

app.get('*', function (req, res) {
res.sendFile(path.join(__dirname + '/dist/index.html'));
});


var port = process.env.PORT || 3003;

// var server = app.listen(3003);

// var io = require('socket.io').listen(server);

// io.sockets.on('connection', function (socket) {
//   console.log("Socket is connected...");
// });

const server = http.createServer(app);
const io = socketIO(server);
app.set('io', io);


server.listen(port);
