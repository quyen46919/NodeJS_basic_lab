const mongoose = require('mongoose');
const configs = require('./config');

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(configs.serverConfigs.mongodbUrl);
        console.log(`MongoDB connected at: ${connect.connection.host}`);
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;