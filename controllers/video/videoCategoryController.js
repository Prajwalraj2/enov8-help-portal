const VideoCategory = require('../../models/video/VideoCategory');
const Video = require('../../models/video/Video');

// GET all video categories
exports.getAll = async (_req, res) => {
  try {
    const categories = await VideoCategory.find().sort('order');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

// // POST create a new category
// exports.create = async (req, res) => {
//   try {
//     const category = new VideoCategory({ name: req.body.name });
//     await category.save();
//     res.json({ message: 'Category created', category });
//   } catch (err) {
//     res.status(400).json({ error: 'Category creation failed' });
//   }
// };

// POST create a new category
exports.create = async (req, res) => {
  try {
    const { name, order, iconClass } = req.body;

    if (!name || !order || !iconClass) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const category = new VideoCategory({ name, order, iconClass });
    await category.save();
    res.json({ message: 'Category created', category });
  } catch (err) {
    res.status(400).json({ error: 'Category creation failed' });
  }
};

// // PATCH update a category
// exports.update = async (req, res) => {
//   try {
//     const updated = await VideoCategory.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
//     res.json({ message: 'Category updated', updated });
//   } catch (err) {
//     res.status(400).json({ error: 'Failed to update category' });
//   }
// };

// PATCH update a category
exports.update = async (req, res) => {
  try {
    const { name, order, iconClass } = req.body;
    if (!name || !order || !iconClass) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const updated = await VideoCategory.findByIdAndUpdate(
      req.params.id,
      { name, order, iconClass },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json({ message: 'Category updated', updated });
  } catch (err) {
    res.status(400).json({ error: 'Failed to update category', err: err.message });
  }
};

// DELETE category and its videos
exports.remove = async (req, res) => {
  try {
    const deleted = await VideoCategory.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Category not found' });
    }
    await Video.deleteMany({ category: req.params.id }); // cascade delete
    res.json({ message: 'Category and its videos deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete category', err: err.message });
  }
};
