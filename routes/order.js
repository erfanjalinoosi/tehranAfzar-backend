const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const Product = require("../models/product");
const middleware = require("../middleware");
const mongoose = require("mongoose");


router.post(
    "/",
    [middleware.isLoggedIn],
    async (req, res, next) => {
        try {

            const items = req.body.items;

            if (!items || items.length === 0) {
                throw Error('You should add at least one product.')
            }

            let amount = 0
            let products = []

            for (const item of items) {
                if (!item.id || !item.count || item.count <= 0) {
                    throw Error('Item is not valid.')
                }

                const product = await Product.findOne({
                    _id: item.id
                });

                if (!product) {
                    throw Error('Product not found.')
                }

                if (product.stock < item.count) {
                    throw Error(`Low stock for product ${product.id}`)
                }

                amount += product.price * item.count;

                products.push({
                    orderId: item.id,
                    count: item.count
                })
            }

            const order = new Order({
                userId: req.user._id,
                products: products,
                amount: amount,
                createdAt: new Date()
            })

            await order.save()

            for (const item of items) {
                await Product.findOneAndUpdate(item.id, {
                    $inc: {
                        stock: item.count * -1,
                        purchase: item.count * 1
                    }
                })
            }


            return res.send({
                message: "Order created successfully",
                data: order
            })
        } catch (err) {
            next(err)
        }
    }
);


router.get("/", [middleware.isLoggedIn], async (req, res, next) => {
    try {
        const orders = await Order.find({
            userId: req.user._id
        });

        res.send({
            message: "User orders find successfully.",
            data: orders
        })
    } catch (err) {
        next(err)
    }
});


module.exports = router;
