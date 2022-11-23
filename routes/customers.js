const express = require('express');
const router = express.Router();
const customers = require('../services/customers.js');


router.get('/', async function(req, res, next) {
  try {
    res.json(await customers.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting customers `, err.message);
    next(err);
  }
});

module.exports = router;