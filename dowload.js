const axios = require('axios');
const Purchase = require('./models/purchase');
const { dynamodb, mongodb } = require('./db/config');
const { createPurchaseItem } = require('./helpers/createPurchaseItem')
const { getForeignKey } = require('./helpers/getForeignKey')
const mysql = require('mysql2/promise');
require('dotenv').config()


mongodb()

// Configura la conexión a tu base de datos MySQL
const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
};



async function savePurchaseToMySQL(data, connection) {
  try {
    const materialId = await getForeignKey(data.material, 'material', connection);
    const paymentMethodId = await getForeignKey(data.payment_method, 'payment_method', connection);
    const categoryId = await getForeignKey(data.category, 'category', connection);
    const brandId = await getForeignKey(data.brand, 'brand', connection);
    const genderId = await getForeignKey(data.gender, 'gender', connection);
    const cityId = await getForeignKey(data.city, 'city', connection);
    const colorId = await getForeignKey(data.color, 'color', connection);
    const countryId = await getForeignKey(data.country, 'country', connection);


    const [result] = await connection.execute(`
      INSERT INTO purchase (payment_method_id, category_id, gender_id, brand_id, city_id, material_id, color_id, country_id, product_name, price, purchase_amount, shipping_address)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      paymentMethodId,
      categoryId,
      genderId,
      brandId,
      cityId,
      materialId,
      colorId,
      countryId,
      data.product_name,
      data.price,
      data.purchase_amount,
      data.shipping_address
    ]);


  } catch (error) {
    console.error('Error in MySQL:', error);
  }
}




const url = process.env.URL_DATA;


const savePurchaseToDynamoDB = async (data) => {


  const item = createPurchaseItem(data);

  const params = {
    TableName: 'Purchases',
    Item: item,
  };

  try {
    await dynamodb.putItem(params).promise();

  } catch (error) {
    console.error('Error in DynamoDb:', error);
  }
};

const savePurchaseToMongoDB = async (data) => {
  const purchase = new Purchase(data);
  await purchase.save();
};

const downloadData = async () => {
  try {
    connection = await mysql.createConnection(dbConfig);
    const response = await axios.get(url);
    await Promise.all(response.data.map(savePurchaseToMongoDB));
    /*await Promise.all(response.data.map(savePurchaseToDynamoDB));*/

   /* await Promise.all(response.data.map((data) => savePurchaseToMySQL(data, connection)));*/

    for (const data of response.data) {
      await savePurchaseToMySQL(data, connection);
    }


    console.log('Termino incersiones')
  } catch (error) {
    console.error('Error al descargar o guardar el archivo:', error.message);
  }
  finally {
    if (connection) {
      connection.end();
    }
  }
};

const executeDownloadForAnalysis = async () => {
  for (let i = 0; i < 1; i++) {
    console.log(`Ejecutando descarga y análisis número ${i + 1}`);
    await downloadData();
  }
};

executeDownloadForAnalysis();



