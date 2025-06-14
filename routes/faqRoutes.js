const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faqController');

// FAQ Routes (No auth)
router.get('/', faqController.getAllFaqs);
router.get('/:section', faqController.getFaqsBySection);
router.post('/', faqController.createFaq);
router.put('/:id', faqController.updateFaq);
router.delete('/:id', faqController.deleteFaq);

// Domain Routes (No auth)
router.get('/domains/list', faqController.getDomains);
router.post('/domains', faqController.createDomain);
router.put('/domains/:id', faqController.updateDomain);
router.delete('/domains/:id', faqController.deleteDomain);

module.exports = router;
