const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    products: [
        {
            _id: false,
            orderId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            count: {
                type: Number,
                default: 0,
            }
        },
    ],
    amount: {
        type: Number,
        default: 0
    },
    address: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("Order", orderSchema);
