const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM orders LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(newProductData){
  const result = await db.query(
    `INSERT INTO orders(customer_id, product_id, quantity, payment_id, order_date, admin_id) VALUES (${newProductData.customer_id}, ${newProductData.product_id}, ${newProductData.quantity}, ${newProductData.payment_id}, ${new Date().toISOString().slice(0, 19).replace('T', ' ')}, ${newProductData.admin_id})`
  );
  let message = "Error in creating new order"
  if (result.affectedRows) {
    message = 'New order created successfully';
  }
  return {message};
}

module.exports = {
  getMultiple,
  create
}