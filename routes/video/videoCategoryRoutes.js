const router = require('express').Router();
const ctl = require('../../controllers/video/videoCategoryController');

// GET all categories
router.get('/', ctl.getAll);

// POST create new category
router.post('/', ctl.create);

// PATCH update category
router.patch('/:id', ctl.update);

// DELETE category (and its videos)
router.delete('/:id', ctl.remove);

module.exports = router;
