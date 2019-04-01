var {Router} = require('express');
var router = Router();
var ProductsModel = require('../models/ProductsModel');

router.get('/', function(_, res){
    res.send('admin app');
});

router.get('/products', function(_, res){
    res.render('admin/product.ejs',{
        products: "productswqwq"
    });
});

router.get('/products/write', function(_, res){
    res.render('admin/form.ejs',{
    });
});

router.post('/products/write', function(req, res){
    var product = new ProductsModel({
        name: req.body.name,
        price : req.body.price,
        description: req.body.description,
    });
    product.save(function(err){
        res.redirect('/admin/products');
    });
});

module.exports = router;