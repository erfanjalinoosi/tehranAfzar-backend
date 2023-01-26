const express = require("express");
const router = express.Router();
const Product = require("../models/product");


router.get("/", async (req, res) => {
    const perPage = 8;
    let page = parseInt(req.query.page) || 1;
    try {
        const sortKey = req.query.sortKey || null
        const sortValue = req.query.sortValue || 1
        const sort = sortKey ? [[sortKey, sortValue]] : [];

        const categories = req.query.category || null
        const filers = categories ? {"category": categories} : {}

        const products = await Product.find(filers)
            .sort(sort)
            .skip(perPage * page - perPage)
            .limit(perPage)

        res.send({
            message: "Products indexed successfully.",
            date: products
        })

    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
});

router.get("/search", async (req, res) => {
    const perPage = 8;
    let page = parseInt(req.query.page) || 1;

    try {
        const products = await Product.find({
            title: {$regex: req.query.text, $options: "i"},
        })
            .sort([['stock', -1]])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec();

        res.send({
            message: "Products find successfully.",
            data: {
                text: req.query.text,
                products: products
            }
        })
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
});


router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findOne({
            _id: req.params.id
        });

        if (!product) {
            throw new Error("Product not found.")
        }


        await Product.findByIdAndUpdate(req.params.id, {
            $inc: {
                view: 1
            }
        })

        res.send({
            message: "Product find successfully.",
            data: product
        })

    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
});


module.exports = router;
