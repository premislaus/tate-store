var express = require('express');
var router = express.Router();

/* GET Prints page. */
router.get('/', function(req, res, next) {
    res.render('categories/prints', { title: 'Art Prints | Tate Shop' });
});

module.exports = router;