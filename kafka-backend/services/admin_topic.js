var mongoose = require('mongoose');
var { addProductCat } = require('../models/addProductCat');

exports.adminService = function adminService(msg, callback) {
    console.log("In admin Profile service path:", msg.path);
    switch (msg.path) {
        case "addProductCategory":
            addProductCategory(msg, callback);
            break;
        case "getProductCategories":
            getProductCategories(msg, callback);
            break;
    }

};

function addProductCategory(msg, callback) {
    let response = {};
    let err = {};
    console.log("In admin topic service. Msg: ", msg);

    addProductCat.find({
        $and: [{ "productCategoryName": msg.body.productCategory }]
    }).select().then(async result => {
        console.log("product category", result);
        if (result.length === 0) {
            var newProductCategory = new addProductCat({
                productCategoryName: msg.body.productCategory
            })
            newProductCategory.save().then(result1 => {
                response.data = result1;
                response.message = "successfully added Product category";
                response.status = 200;
                return callback(null, response);
            }).catch(err => {
                err.status = 400;
                err.message = "Error in adding category";
                return callback(err, null);
            });
        } else {
            response.status = 401;
            response.message = "Product category already exists";
            return callback(null, response);
        }
    }).catch(error => {
        console.log(error);
        err.status = 412;
        err.message = "could not add product category";
        err.data = error;
        return callback(err, null);
    })

}

function getProductCategories(msg, callback) {
    let response = {};
    let err = {};
    console.log("In admin topic service. Msg: ", msg);

    addProductCat.find().select('productCategoryName')
        .then(async result => {
            if (result.length === 0) {
                response.message = "Product Categories not found";
                response.status = 201;
                return callback(null, response);
            }
            else {
                response.data = result;
                response.status = 200;
                response.message = "Product categories found";
                return callback(null, response);
            }
        }).catch(error => {
            console.log(error);
            err.status = 412;
            err.message = "Could not find product";
            err.data = error;
            return callback(err, null);
        })


}