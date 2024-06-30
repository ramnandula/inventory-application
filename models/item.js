const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "category", required: true },
    price: { type: Number, required: true },
    number_in_stock: { type: Number, required: true }
})

// Virtual for item's URL
ItemSchema.virtual("url").get(function() {
    return `/inventory/item/${this.id}`;
});

// Export model
module.exports = mongoose.model("item", ItemSchema);