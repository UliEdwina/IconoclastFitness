var express = require('express');
var router = express.Router();

/* GET admin page. */
router.get('/', function(req, res, next) {
  res.send("resource");
});
router.get('/admin', (req, res) => {
   
    res.render('admin/admin', { error_msg: null})
})
module.exports = router;