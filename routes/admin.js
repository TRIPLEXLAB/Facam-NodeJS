var {Router} = require('express');
var router = Router();
var ProductsModel = require('../models/ProductsModel');

router.get('/', function(_, res){
    res.send('admin app');
});

router.get('/products', function(_, res){
    ProductsModel.find({}, function(_, products){
        res.render('admin/product.ejs',{
            products
        });
    });
});

router.get('/products/write', function(_, res){
    res.render('admin/form.ejs', {product : ""});
});

router.post('/products/write', function(req, res){
    var product = new ProductsModel(req.body);
    product.save(function(err){
        res.redirect('/admin/products');
    });
});

router.get('/products/detail/:id', function(req, res){
    // url 에서 변수 값을 받아올땐 req.params.id 로 받아온다
    ProductsModel.findOne({'id':req.params.id}, function(err, product){
        res.render('admin/productsDetail.ejs', {product: product});
    });
});

router.get('/products/edit/:id', function(req, res){
    //기존에 폼에 value안에 값을 셋팅하기 위해 만든다.
    ProductsModel.findOne({id: req.params.id}, function(err, product){
        res.render('admin/form.ejs', {product : product});
    });
});

router.post('/products/edit/:id', function(req, res){
    //넣을 변수 값을 셋팅한다.
    // var query = {
    //     name: req.body.name,
    //     price : req.body.price,
    //     description : req.body.description,
    // };

    //update의 첫번째 인자는 조건, 두번째 인자는 바뀔 겂들
    ProductsModel.update({id: req.params.id},{$set: req.body}, function(err){
        res.redirect('/admin/products/detail/' + req.params.id); //수정후 본래보던 상세페이지로 이동
    });
});


module.exports = router;