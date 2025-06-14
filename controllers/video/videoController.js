const Video = require('../../models/video/Video');

// GET all videos grouped by category
exports.getGrouped = async (_req, res) => {
  try {
    const videos = await Video.find().populate('category', 'name');
    const grouped = {};

    videos.forEach(video => {
      if (!video.category || !video.category.name) return;

      const catName = video.category.name;
      if (!grouped[catName]) grouped[catName] = [];

      grouped[catName].push({
        _id: video._id,
        title: video.title,
        youtubeId: video.youtubeId,
        description: video.description,
        order: video.order
      });
    });

    res.json(grouped);
  } catch (err) {
    console.error('❌ Error fetching videos:', err.message);
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
};




// POST add video
exports.create = async (req, res) => {
  try {
    const { title, youtubeId, categoryId, description, order } = req.body;

    if (!title || !youtubeId || !categoryId || order === undefined) {
      return res.status(400).json({ error: 'Title, YouTube Video ID, Category, and Order are required.' });
    }

    const video = new Video({ title, youtubeId, category: categoryId, description, order });
    await video.save();
    res.json({ message: 'Video added', video });
  } catch (err) {
    res.status(400).json({ error: 'Failed to add video', err: err.message });
  }
};

// // PATCH update video
// exports.update = async (req, res) => {
//   try {
//     const updated = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json({ message: 'Video updated', updated });
//   } catch (err) {
//     res.status(400).json({ error: 'Failed to update video' });
//   }
// };

// PATCH update video
exports.update = async (req, res) => {
  try {
    const { title, youtubeId, categoryId, order, description } = req.body;

    if (!title || !youtubeId || !categoryId || order === undefined) {
      return res.status(400).json({ error: 'Title, YouTube ID, Category, and Order are required.' });
    }

    const updated = await Video.findByIdAndUpdate(
      req.params.id,
      { title, youtubeId, category: categoryId, order, description },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Video not found.' });
    }

    res.json({ message: 'Video updated', updated });
  } catch (err) {
    res.status(400).json({ error: 'Failed to update video', details: err.message });
  }
};

// DELETE video
exports.remove = async (req, res) => {
  try {
    const deleted = await Video.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Video not found.' });
    }
    res.json({ message: 'Video deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete video', details: err.message });
  }
};
