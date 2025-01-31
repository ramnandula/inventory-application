const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }
})

// Virtual for category's URL
CategorySchema.virtual("url").get(function() {
    return `/inventory/category/${this._id}`;
});

// Export model
module.exports = mongoose.model("category", CategorySchema);