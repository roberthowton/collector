const express = require('express');
const discogsController = require('../controllers/discogsController');
const router = express.Router();

router.get('/api', discogsController.getCollection, (req, res) => {
  return res.status(200).json({collection: res.locals.collection.releases})
})




module.exports = router;
