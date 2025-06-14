const { Schema, model } = require("mongoose");

const guideCategorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    order: { type: Number, required: true }
  },
  { timestamps: true }
);

module.exports = model("GuideCategory", guideCategorySchema);
