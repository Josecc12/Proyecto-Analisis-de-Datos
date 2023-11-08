const mongoose = require('mongoose');
const AWS = require('aws-sdk');

require('dotenv').config()






AWS.config.update({
    region: 'us-east-1',
    credentials: {
        accessKeyId: process.env.DYNAMO_PUBLIC_KEY,
        secretAccessKey: process.env.DYNAMO_SECRET_KEY
    }
});


const dynamodb = new AWS.DynamoDB();

const mongodb = async () => {
    
    try {
        await mongoose.connect(process.env.DB_CNN,
            { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('db_online')
    } catch (error) {
        console.log(error)
        console.log('Error initializing DB')
    }
}


module.exports = {
    mongodb,
    dynamodb 
}

