const { default: mongoose } = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/Listed');

const db = mongoose.connection;

db.on('error',console.error.bind('error','Error in connecting to mongodb'));
db.once('open',function(){
    console.log("Connected to MongoDB");
})