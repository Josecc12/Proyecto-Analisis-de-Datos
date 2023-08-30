const {dynamodb} = require('./db/config');

const params = {
  TableName: 'Employees'
};

dynamodb.scan(params, (err, data) => {
    if (err) {
      console.error('Error:', err);
    } else {
      const outputText = JSON.stringify(data, null, 2); // El segundo parámetro es para dar formato
      console.log('Data:', outputText);
    }
  });


