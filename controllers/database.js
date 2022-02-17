const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/qlhandmade', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.Promise = global.Promise;

var conn = mongoose.connection;
conn.on('connected', function () {
  console.log('Database is connected successfully');
});
conn.on('disconnected', function () {
  console.log('Database is DISconnected successfully');
});
conn.on('error', console.error.bind(console, 'connection error:'));

module.exports = conn;

	