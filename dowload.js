const axios = require('axios');
const { mongodb } = require('./db/config');
const Purchase = require('./models/purchase');



mongodb();

const url = 'https://api.mockaroo.com/api/6b6a2000?count=1000&key=3f3ddd60';

const savePurchaseToMongoDB = async (data) => {
  const purchase = new Purchase(data);
  console.log(purchase);
  await purchase.save();
};

const downloadData = async () => {
  try {
    const response = await axios.get(url);
    await Promise.all(response.data.map(savePurchaseToMongoDB));
  } catch (error) {
    console.error('Error al descargar o guardar el archivo:', error.message);
  }
};

const executeDownloadForAnalysis = async () => {
  for (let i = 0; i < 1; i++) {
    console.log(`Ejecutando descarga y análisis número ${i + 1}`);
    await downloadData();
  }
};

executeDownloadForAnalysis();

