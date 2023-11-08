const {response} = require('express');
const {dynamodb} = require('../db/config');
const AWS = require('aws-sdk');





const docClient = new AWS.DynamoDB.DocumentClient({ service: dynamodb });

// Nombre de la tabla de DynamoDB
const tableName = 'Purchases'; 

const getDocumentsAndCountGenders = async (req, res) => {
  try {
    const params = {
      TableName: tableName,
      ProjectionExpression: 'gender', // Solo selecciona el atributo gender
    };

    const scanResult = await dynamodb.scan(params).promise();

    const genders = scanResult.Items.map((item) => item.gender);

    // Realiza el conteo de cada valor de gender
    const genderCounts = genders.reduce((acc, gender) => {
      const genderValue = gender.S; // Obtén el valor real del género
      if (!acc[genderValue]) {
        acc[genderValue] = 1;
      } else {
        acc[genderValue]++;
      }
      return acc;
    }, {});

    res.json(genderCounts);
  } catch (error) {
    console.error('Error counting genders:', error);
    res.status(500).json({ error: 'Error counting genders' });
  }
};


// Function to count payment methods
const getPaymentMethodCounts = async (req, res) => {
  try {
    const params = {
      TableName: tableName,
      ProjectionExpression: 'payment_method', // Solo selecciona el atributo payment_method
    };

    const scanResult = await dynamodb.scan(params).promise();

    const paymentMethods = scanResult.Items.map((item) => item.payment_method);
    
    // Realiza el conteo de cada valor de payment_method
    const paymentMethodCounts = paymentMethods.reduce((acc, paymentMethod) => {
      if (!acc[paymentMethod.S]) {
        acc[paymentMethod.S] = 1;
      } else {
        acc[paymentMethod.S]++;
      }
     
      return acc;
    }, {});

    res.json(paymentMethodCounts);
  } catch (error) {
    console.error('Error counting payment methods:', error);
    res.status(500).json({ error: 'Error counting payment methods' });
  }
};


const getTop5Countries = async (req, res) => {
  try {
    const params = {
      TableName: tableName,
      ProjectionExpression: 'country', // Selecciona el atributo country
    };

    const scanResult = await dynamodb.scan(params).promise();

    const countries = scanResult.Items.map((item) => item.country);

    // Realiza el conteo de cada valor de country
    const countryCounts = countries.reduce((acc, country) => {
      const countryValue = country.S; // Obtén el valor real del país
      if (!acc[countryValue]) {
        acc[countryValue] = 1;
      } else {
        acc[countryValue]++;
      }
      return acc;
    }, {});

    // Convierte el objeto en un objeto JSON
    const top5Countries = Object.entries(countryCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .reduce((acc, [country, count]) => {
        acc[country] = count;
        return acc;
      }, {});

    res.json(top5Countries);
  } catch (error) {
    console.error('Error counting countries:', error);
    res.status(500).json({ error: 'Error counting countries' });
  }
};
  module.exports = { getDocumentsAndCountGenders , getPaymentMethodCounts , getTop5Countries };