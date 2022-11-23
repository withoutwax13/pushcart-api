const express = require('express');
const router = express.Router();
const orders = require('../services/orders.js');


router.get('/', async function(req, res, next) {
  try {
    res.json(await orders.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting orders `, err.message);
    next(err);
  }
});

module.exports = router;