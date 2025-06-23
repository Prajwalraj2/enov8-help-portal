const GuideCategory = require('../../models/guide/GuideCategory');
const GuideContent = require('../../models/guide/GuideContent');

// 🚀 Simple in-memory cache
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCacheKey(key) {
  return `categories_with_guides_${key}`;
}

function isValidCache(item) {
  return item && (Date.now() - item.timestamp) < CACHE_TTL;
}

// Clear cache when data changes
function clearCache() {
  cache.clear();
}

// Get all categories (sorted by order)
exports.getAll = async (_req, res) => {
  const categories = await GuideCategory.find().sort('order');
  res.json(categories);
};

// 🚀 NEW: Get all categories with their guides in ONE request (CACHED)
exports.getAllWithGuides = async (_req, res) => {
  try {
    const cacheKey = getCacheKey('all');
    const cached = cache.get(cacheKey);
    
    // Return cached data if valid
    if (isValidCache(cached)) {
      return res.json(cached.data);
    }

    const categories = await GuideCategory.find().sort('order');
    
    // Get all guides for all categories in one query
    const allGuides = await GuideContent.find({
      category: { $in: categories.map(cat => cat._id) }
    }).sort('guideorder');
    
    // Group guides by category
    const categoriesWithGuides = categories.map(category => ({
      ...category.toObject(),
      guides: allGuides.filter(guide => 
        guide.category.toString() === category._id.toString()
      )
    }));
    
    // Cache the result
    cache.set(cacheKey, {
      data: categoriesWithGuides,
      timestamp: Date.now()
    });
    
    res.json(categoriesWithGuides);
  } catch (err) {
    console.error('Error fetching categories with guides:', err);
    res.status(500).json({ error: 'Failed to fetch categories with guides' });
  }
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
    clearCache(); // 🚀 Clear cache when data changes
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
    clearCache(); // 🚀 Clear cache when data changes

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

    clearCache(); // 🚀 Clear cache when data changes
    res.json({ message: 'Category and all associated guides deleted successfully.' });
  } catch (err) {
    console.error('Error deleting category and guides:', err);
    res.status(500).json({ error: 'Server error during deletion' });
  }
};

