const { response } = require('express');
const Purchase = require('../models/purchase')
const mysql = require('mysql2/promise');


const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
});




const getGenderCountsMySQL = async (req, res = response) => {
  console.log('asd')
  try {
    const connection = await pool.getConnection();
    const [results] = await connection.query(`
          SELECT g.gender, COUNT(*) as count FROM purchase p 
          INNER JOIN gender g ON p.gender_id = g.idgender 
          GROUP BY g.gender
        `);
    connection.release();

    // Reformatear los resultados antes de enviarlos como respuesta
    const formattedResults = results.reduce((acc, row) => {
      acc[row.gender] = row.count;
      return acc;
    }, {});

    res.json(formattedResults);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching s counts' });
  }
};


const getPaymentMethodCounts = async (req, res = response) => {
  try {
    const connection = await pool.getConnection();
    const [results] = await connection.query(`
      SELECT pm.payment_method, COUNT(*) as count FROM purchase p 
      INNER JOIN payment_method pm ON p.payment_method_id = pm.idpayment_method 
      GROUP BY pm.payment_method
    `);
    connection.release();

    // Reformatear los resultados
    const formattedResults = results.reduce((acc, row) => {
      acc[row.payment_method] = row.count;
      return acc;
    }, {});

    res.json(formattedResults);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching s counts' });
  }
};

const getTop5CountriesByPurchaseCount = async (req, res = response) => {
  try {
    const connection = await pool.getConnection();
    const [results] = await connection.query(`
      SELECT c.country, COUNT(*) as count FROM purchase p 
      INNER JOIN country c ON p.country_id = c.idcountry 
      GROUP BY c.country
      ORDER BY count DESC
      LIMIT 5
    `);
    connection.release();

   

    // Reformatear los resultados en un solo objeto
    const formattedResults = results.reduce((acc, row) => {
      acc[row.country] = row.count;
      return acc;
    }, {});

    res.json(formattedResults);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching s counts' });
  }
};

module.exports = {
  getGenderCountsMySQL,
  getPaymentMethodCounts,
  getTop5CountriesByPurchaseCount

}