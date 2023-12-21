const mongoose = require("mongoose");

const userDocumentSchema = new mongoose.Schema({
    
    name: { type: String, required: true },
    age: { type: Number, required: true },


}, { timestamps: true });

module.exports = mongoose.model("UserDocument", userDocumentSchema)

