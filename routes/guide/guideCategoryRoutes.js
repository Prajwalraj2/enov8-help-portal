const router = require("express").Router();
const ctl = require("../../controllers/guide/guideCategoryController");

router.get("/", ctl.getAll);        // Get all categories
router.post("/", ctl.create);       // Add a category
router.put("/:id", ctl.update);     // Update category
router.delete("/:id", ctl.remove);  // Delete category

module.exports = router;
