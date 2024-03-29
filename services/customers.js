const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT customer_id, first_name, last_name, gender, birthdate, email_address, address_line_1, address_line_2, city, postal_code, password, mobile_number FROM customers LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(customerData){
  const result = db.query(
    `INSERT INTO customers (customer_id, first_name, last_name, gender, birthdate, email_address, address_line_1, address_line_2, city, postal_code, password, mobile_number) 
    VALUES (${customerData.customer_id}, "${customerData.first_name}", "${customerData.last_name}", "${customerData.gender}", "${customerData.birthdate}", "${customerData.email_address}", 
    "${customerData.address_line_1}", "${customerData.address_line_2}", "${customerData.city}", ${customerData.postal_code}, "${customerData.password}", ${customerData.mobile_number})`
  )
  let message = "Error in creating new customer on the services side"
  if (result.affectedRows) {
    message = 'New customer created successfully';
  }
  return {message};
}

module.exports = {
  getMultiple,
  create
}