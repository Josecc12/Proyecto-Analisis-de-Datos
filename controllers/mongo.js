const {response} = require('express');
const Purchase = require('../models/purchase')

// Function to fetch documents and count their genders
const getDocumentsAndCountGenders = async (req, res = response) => {
    try {
      const documents = await Purchase.find({});
      
      const genders = {};
  
      documents.forEach((document) => {
        if (document.gender in genders) {
          genders[document.gender]++;
        } else {
          genders[document.gender] = 1;
        }
      });
  
      res.json(genders);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching documents' });
    }
  };

// Function to get the top 5 countries based on purchases
const getTop5Countries = async (req, res = response) => {
  try {
    // Agregación para contar las compras por país y obtener los top 5
    const top5Countries = await Purchase.aggregate([
      {
        $group: {
          _id: '$country',
          totalPurchases: { $sum: 1 },
        },
      },
      { $sort: { totalPurchases: -1 } },
      { $limit: 5 },
    ]);

    // Realizar una transformación del resultado para el formato deseado
    const formattedTop5Countries = {};
    top5Countries.forEach(item => {
      formattedTop5Countries[item._id] = item.totalPurchases;
    });

    res.json(formattedTop5Countries);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching top 5 countries' });
  }
};


// Function to get the count of payment methods
const getPaymentMethodCounts = async (req, res = response) => {
  try {
    const paymentMethodCounts = await Purchase.aggregate([
      {
        $group: {
          _id: '$payment_method',
          count: { $sum: 1 },
        },
      },
    ]);

    // Realizar una transformación del resultado para el formato deseado
    const formattedPaymentMethodCounts = {};
    paymentMethodCounts.forEach(item => {
      formattedPaymentMethodCounts[item._id] = item.count;
    });

    res.json(formattedPaymentMethodCounts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching payment method counts' });
  }
};


  
  module.exports = { getDocumentsAndCountGenders , getTop5Countries , getPaymentMethodCounts };