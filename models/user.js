const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    birthday: {
        type: mongoose.Schema.Types.Date
    },
    phoneNumber: {
        type: String
    },
    landLineNumber: {
        type: String
    },
    nationalCode: {
        type: String
    },
    password: {
        type: String,
        require: true,
    },
});

userSchema.method('toJSON', function () {
    const user = this.toObject();
    delete user.password;
    delete user.__v;
    return user;
})

module.exports = mongoose.model("User", userSchema);
