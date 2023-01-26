const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = Schema({
    productCode: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    imagePath: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: [ {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        }],
    },
    manufacturer: {
        type: String,
    },
    stock: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    purchase: {
        type: Number,
        default: 0
    },
    view: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("Product", productSchema);
