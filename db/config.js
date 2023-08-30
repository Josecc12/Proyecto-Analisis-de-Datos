const mongoose = require('mongoose');
const AWS = require('aws-sdk');
require('dotenv').config()




AWS.config.update({
    region: 'us-east-1',
    credentials: {
        accessKeyId: 'AKIA3QASZ5DWF2XB7BFR',
        secretAccessKey: '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'
    }
});


const dynamodb = new AWS.DynamoDB();

const mongodb = async () => {
    
    try {
        await mongoose.connect(process.env.DB_CNN,
            { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('db_online')
    } catch (error) {
        console.log('Error initializing DB')
    }
}


module.exports = {
    mongodb,
    dynamodb 
}

