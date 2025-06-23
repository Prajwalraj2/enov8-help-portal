const { Schema, model } = require("mongoose");

const guideCategorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    order: { type: Number, required: true }
  },
  { timestamps: true }
);

// 🚀 Performance Indexes
guideCategorySchema.index({ order: 1 }); // For sorting by order
// Note: name already has unique index, no need to add another
guideCategorySchema.index({ createdAt: -1 }); // For recent queries

module.exports = model("GuideCategory", guideCategorySchema);
