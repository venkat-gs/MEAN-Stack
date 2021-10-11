const mongoose = require("mongoose");
const url = 'mongodb://localhost:27017/Users';

try{
    mongoose.connect(url, {useNewUrlParser: true});
    const con = mongoose.connection;
    con.on('open', () => {
        console.log('MongoDb connection successed!');
    });
}
catch(e){
    console.log(e);
}
module.exports = mongoose;
