const router = require('express').Router();
const ctl = require('../../controllers/video/videoController');

// GET grouped videos by category
router.get('/', ctl.getGrouped);

// POST new video
router.post('/', ctl.create);

// PATCH update video
router.patch('/:id', ctl.update);

// DELETE video
router.delete('/:id', ctl.remove);

module.exports = router;
