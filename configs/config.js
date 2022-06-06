require('dotenv').config;

const PORT = process.env.PORT || '4000';
const MONGODB_URL = process.env.MONGODB_URL || '';

const serverConfigs = {
    port: PORT,
    mongodbUrl: MONGODB_URL,
};

const configs = {
    serverConfigs: serverConfigs
};

module.exports = configs;