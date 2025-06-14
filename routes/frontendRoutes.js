// routes/frontendRoutes.js

const express = require('express');
const path = require('path');
const router = express.Router();



// routes/frontendRoutes.js
router.get('/', (req, res) => {
    res.render('index'); // No .ejs needed
});


router.get('/faq', (req, res) => {
    res.render('faq/faq'); // views/faq/faq.ejs
});


// Guide Category Grid View
router.get('/guide', (req, res) => {
    res.render('guide/GuideCategory'); // views/guide/GuideCategory.ejs
  });
  
  // Guide Detail Viewer
  router.get('/guide/detail', (req, res) => {
    res.render('guide/GuideSubCategory2'); // views/guide/GuideSubCategory2.ejs
  });
  
  // Video Listing Page
  router.get('/video', (req, res) => {
    res.render('video/VideoPage'); // views/video/VideoPage.ejs
  });
  
  // Video Player Detail Page
  router.get('/video/player', (req, res) => {
    res.render('video/VideoPlayerPage'); // views/video/VideoPlayerPage.ejs
  });

  router.get('/admin', (req, res) => {
    res.render('admin'); // views/admin/admin.ejs
  });

  

module.exports = router;
