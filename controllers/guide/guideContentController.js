const GuideContent = require('../../models/guide/GuideContent');

// Get all guides for a category
exports.getByCategory = async (req, res) => {
  const guides = await GuideContent.find({ category: req.params.catId }).sort('guideorder');
  res.json(guides);
};

// Get single guide
exports.getOne = async (req, res) => {
  const guide = await GuideContent.findById(req.params.id);
  if (!guide) return res.status(404).json({ msg: 'Guide not found' });
  res.json(guide);
};

// Create new guide
// exports.create = async (req, res) => {
//   const guide = await GuideContent.create(req.body);
//   res.status(201).json(guide);
// };

exports.create = async (req, res) => {
  const { category, guidetitle, guidecontent, guideorder, iconClass } = req.body;

  // Manual validations
  if (!category || !guidetitle || !guidecontent || guideorder === undefined) {
    return res.status(400).json({
      error: 'All fields (category, guidetitle, guidecontent, guideorder) are required.'
    });
  }

  try {
    const guide = await GuideContent.create({
      category,
      guidetitle: guidetitle.trim(),
      guidecontent: guidecontent.trim(),
      guideorder,
      iconClass
    });
    res.status(201).json(guide);
  } catch (err) {
    res.status(500).json({ error: 'Could not create guide', details: err.message });
  }
};

// Update guide
// exports.update = async (req, res) => {
//   const updated = await GuideContent.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   if (!updated) return res.status(404).json({ msg: 'Guide not found' });
//   res.json(updated);
// };

// exports.update = async (req, res) => {
//   const { guidetitle, guidecontent, guideorder, category } = req.body;

//   if (!category || !guidetitle || !guidecontent || guideorder === undefined) {
//     return res.status(400).json({
//       error: 'All fields (category, guidetitle, guidecontent, guideorder) are required for update.'
//     });
//   }

//   try {
//     const updated = await GuideContent.findByIdAndUpdate(
//       req.params.id,
//       {
//         category,
//         guidetitle: guidetitle.trim(),
//         guidecontent: guidecontent.trim(),
//         guideorder
//       },
//       { new: true }
//     );

//     if (!updated) return res.status(404).json({ msg: 'Guide not found' });
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ error: 'Could not update guide', details: err.message });
//   }
// };

exports.update = async (req, res) => {
  const { id } = req.params;
  const { guidetitle, guidecontent, guideorder, category, iconClass } = req.body;

  if (!category || !guidetitle || !guidecontent || guideorder === undefined) {
    return res.status(400).json({
      error: 'All fields (category, guidetitle, guidecontent, guideorder) are required for update.'
    });
  }

  try {
    const existingGuide = await GuideContent.findById(id);
    if (!existingGuide) {
      return res.status(404).json({ error: 'Guide not found' });
    }

    existingGuide.category = category;
    existingGuide.guidetitle = guidetitle.trim();
    existingGuide.guidecontent = guidecontent.trim();
    existingGuide.guideorder = guideorder;
    existingGuide.iconClass = iconClass;

    const updated = await existingGuide.save();

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Could not update guide', details: err.message });
  }
};




// // Delete guide
// exports.remove = async (req, res) => {
//   const deleted = await GuideContent.findByIdAndDelete(req.params.id);
//   if (!deleted) return res.status(404).json({ msg: 'Guide not found' });
//   res.json({ message: 'Guide deleted' });
// };

// Delete guide
exports.remove = async (req, res) => {
  try {
    const deleted = await GuideContent.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ msg: 'Guide not found' });
    res.json({ message: 'Guide deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting guide', details: err.message });
  }
};
