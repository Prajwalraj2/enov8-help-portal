const router = require("express").Router();
const ctl = require("../../controllers/guide/guideContentController");

router.get("/category/:catId", ctl.getByCategory); // Get all guides under a category
router.get("/view/:id", ctl.getOne);               // Get one guide
router.post("/", ctl.create);                      // Add guide
router.put("/:id", ctl.update);                    // Update guide
router.delete("/:id", ctl.remove);                 // Delete guide

module.exports = router;
