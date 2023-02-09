const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    title: {
        type: String,
        required: true
    },
    unit: {
        type: String,
    },
    number: {
        type: String,
    },
    receiver: {
        name: {
            type: String,
        },
        phoneNumber: {
            type: String,
            required: true
        }
    },
    postalCode: {
        type: String
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Address", addressSchema);
