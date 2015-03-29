'use strict';
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/user', function(req, res, next) {
    res.json({
        name: 'this dude',
        email: 'dude@something.com'
    });
});

module.exports = router;
