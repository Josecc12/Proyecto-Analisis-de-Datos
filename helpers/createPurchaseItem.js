const { v4: uuidv4 } = require('uuid');

const createPurchaseItem = (data) => {
    const uid = uuidv4(); // Genera un UUID único
  
    const item = {
      uid: { S: uid }, // Genera un UUID único
    };
  
    const purchaseFields = [
      'payment_method',
      'card_type',
      'product_name',
      'brand',
      'price',
      'purchase_amount',
      'category',
      'shipping_address',
      'color',
      'city',
      'material',
      'country',
      'gender',
    ];
  
    for (const key of purchaseFields) {
      if (data[key] !== undefined) {
        if (typeof data[key] === 'string') {
          item[key] = { S: data[key] };
        } else if (typeof data[key] === 'number') {
          item[key] = { N: data[key].toString() };
        }
      }
    }
  
    return item;
  };

  module.exports = {
    createPurchaseItem
  }