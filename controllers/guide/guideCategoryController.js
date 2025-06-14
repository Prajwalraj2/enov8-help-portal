const GuideCategory = require('../../models/guide/GuideCategory');
const GuideContent = require('../../models/guide/GuideContent');

// Get all categories (sorted by order)
exports.getAll = async (_req, res) => {
  const categories = await GuideCategory.find().sort('order');
  res.json(categories);
};

// Create new category
// exports.create = async (req, res) => {
//   const { name, order } = req.body;
//   if (!name || !order) {
//     return res.status(400).json({ error: 'Name and order are required' });
//   }
//   const existingCategory = await GuideCategory.findOne({ name });
//   if (existingCategory) {
//     return res.status(400).json({ error: 'Category with this name already exists' });
//   }
//   const category = await GuideCategory.create({ name, order });
//   res.status(201).json(category);
// };

exports.create = async (req, res) => {
  const { name, order } = req.body;

  if (!name || order === undefined) {
    return res.status(400).json({ error: 'Both name and order are required.' });
  }

  const trimmedName = name.trim();

  try {
    const category = await GuideCategory.create({ name: trimmedName, order });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: 'Could not create category', details: err.message });
  }
};

// Update category
// exports.update = async (req, res) => {
//   const { id } = req.params;
//   const updated = await GuideCategory.findByIdAndUpdate(id, req.body, { new: true });
//   if (!updated) return res.status(404).json({ error: 'Category not found' });
//   res.json(updated);
// };


// exports.update = async (req, res) => {
//   const { id } = req.params;
//   const { name, order } = req.body;

//   if (!name || order === undefined) {
//     return res.status(400).json({ error: 'Both name and order are required for update.' });
//   }
  

//   try {
//     const updated = await GuideCategory.findByIdAndUpdate(id, { name, order }, { new: true });
//     if (!updated) return res.status(404).json({ error: 'Category not found' });
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ error: 'Could not update category', details: err.message });
//   }
// };

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, order } = req.body;

  if (!name || order === undefined) {
    return res.status(400).json({ error: 'Both name and order are required for update.' });
  }

  try {
    const existingCategory = await GuideCategory.findById(id);
    if (!existingCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }

    existingCategory.name = name.trim();
    existingCategory.order = order;

    const updated = await existingCategory.save();

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Could not update category', details: err.message });
  }
};





// Delete category and its associated guides
exports.remove = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await GuideCategory.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // 🧹 Auto-delete all guides linked to this category
    await GuideContent.deleteMany({ category: id });

    res.json({ message: 'Category and all associated guides deleted successfully.' });
  } catch (err) {
    console.error('Error deleting category and guides:', err);
    res.status(500).json({ error: 'Server error during deletion' });
  }
};

