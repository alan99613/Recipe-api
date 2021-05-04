const mongoose = require('mongoose')

const MONGO_URL = process.env.MONGODB_URI || 'mongodb://localhost/recipe';

mongoose.connect(MONGO_URL, {
  useNewUrlParser:true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

module.exports = mongoose;