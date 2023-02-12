const express = require("express");
const router = express.Router();
const middleware = require("../middleware");
const storeAddressSchema = require("../schemas/addresses/storeAddressSchema");
const updateAddressSchema = require("../schemas/addresses/updateAddressSchema");
const Address = require("../models/address");
const {validate} = require('../config/validator')

router.post(
    "/",
    [middleware.isLoggedIn, validate(storeAddressSchema)],
    async (req, res, next) => {
        try {
            const address = new Address({
                userId: req.user._id,
                ...req.body
            })

            await address.save();

            return res.send({
                message: "Address created successfully",
                data: address
            })

        } catch (err) {
            next(err)
        }
    }
);

router.put("/:id", [middleware.isLoggedIn, validate(updateAddressSchema)], async (req, res, next) => {
    try {
        const addressId = req.params.id
        const userAddresses = await Address.findOne({userId: req.user._id, _id: addressId});

        if (!userAddresses) {
            throw Error("User Address not found.")
        }

        await Address.updateOne({
            _id: addressId
        }, req.body)

        res.send({
            message: "User address update successfully.",
            data: true
        })
    } catch (err) {
        next(err)
    }
});


router.get("/", middleware.isLoggedIn, async (req, res, next) => {
    try {
        const userAddresses = await Address.find({userId: req.user._id});

        res.send({
            message: "User addresses indexed successfully.",
            data: userAddresses
        })
    } catch (err) {
        next(err)
    }
});

router.get("/:id", middleware.isLoggedIn, async (req, res, next) => {
    try {
        const addressId = req.params.id
        const userAddresses = await Address.findOne({userId: req.user._id, _id: addressId});

        if (!userAddresses) {
            throw Error("User Address not found.")
        }

        res.send({
            message: "User address finded successfully.",
            data: userAddresses
        })
    } catch (err) {
        next(err)
    }
});


module.exports = router;
