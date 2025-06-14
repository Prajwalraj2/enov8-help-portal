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

module.exports = model("GuideContent", guideContentSchema);
