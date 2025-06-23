const { Schema, model } = require("mongoose");

const guideContentSchema = new Schema(
  {
    category: { type: Schema.Types.ObjectId, ref: "GuideCategory", required: true },
    guidetitle: { type: String, required: true },
    guidecontent: { type: String, required: true }, // HTML from Summernote
    guideorder: { type: Number, required: true },
    iconClass: { type: String, default: 'bx bx-folder' }
  },
  { timestamps: true }
);

// 🚀 Performance Indexes
guideContentSchema.index({ category: 1, guideorder: 1 }); // Compound index for category queries with sorting
guideContentSchema.index({ category: 1 }); // For category-based queries
guideContentSchema.index({ guideorder: 1 }); // For sorting by order
guideContentSchema.index({ createdAt: -1 }); // For recent queries

module.exports = model("GuideContent", guideContentSchema);
