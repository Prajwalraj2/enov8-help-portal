const FAQ = require('../models/faq/Faq');
const Domain = require('../models/faq/FaqDomain');

// 🟢 Public - Get all FAQs
exports.getAllFaqs = async (req, res) => {
  const faqs = await FAQ.find();
  res.json(faqs);
};

// 🟢 Public - Get FAQs by section
exports.getFaqsBySection = async (req, res) => {
  const faqs = await FAQ.find({ section: req.params.section });
  res.json(faqs);
};

// 🔐 Admin - Add FAQ
exports.createFaq = async (req, res) => {
  const { section, q, a, type } = req.body;
  const newFAQ = new FAQ({ section, q, a, type });
  await newFAQ.save();
  res.json({ success: true, message: "FAQ added!" });
};

// 🔐 Admin - Update FAQ
exports.updateFaq = async (req, res) => {
  const { section, q, a, type } = req.body;
  await FAQ.findByIdAndUpdate(req.params.id, { section, q, a, type });
  res.json({ success: true, message: "FAQ updated!" });
};

// // 🔐 Admin - Delete FAQ
// exports.deleteFaq = async (req, res) => {
//   await FAQ.findByIdAndDelete(req.params.id);
//   res.json({ success: true, message: "FAQ deleted!" });
// };


exports.deleteFaq = async (req, res) => {
  const faq = await FAQ.findById(req.params.id);
  
  if (!faq) {
    return res.status(404).json({ success: false, message: "FAQ not found." });
  }

  await faq.deleteOne(); // or: await FAQ.findByIdAndDelete(req.params.id);
  
  res.json({ success: true, message: "FAQ deleted!" });
};



// 🔐 Admin - Add Domain
exports.createDomain = async (req, res) => {
  const { name, key, iconClass } = req.body;
  if (!name || !key || !iconClass) return res.status(400).json({ success: false, message: 'Name, Key and Icon Class are required.' });
  const existingDomain = await Domain.findOne({ key });
  if (existingDomain) return res.status(400).json({ success: false, message: 'Domain with this key already exists.' });
  const domain = new Domain({ name, key, iconClass });
  await domain.save();
  res.json({ success: true, message: 'Domain added.', domain });
};

// 🟢 Public - Get Domains
exports.getDomains = async (req, res) => {
  const domains = await Domain.find();
  res.json(domains);
};

// 🔐 Admin - Update Domain
// exports.updateDomain = async (req, res) => {
//   const { name, key, iconClass } = req.body;
//   if (!name || !key || !iconClass) return res.status(400).json({ success: false, message: 'Name, Key and Icon Class are required.' });
//   await Domain.findByIdAndUpdate(req.params.id, { name, key, iconClass });
//   res.json({ success: true, message: 'Domain updated.' });
// };


// exports.updateDomain = async (req, res) => {
//   const { name, key, iconClass } = req.body;
//   const { id } = req.params;

//   if (!name || !key || !iconClass)
//     return res.status(400).json({ success: false, message: 'Name, Key and Icon Class are required.' });

//   // Check if another domain (not the one being updated) already has this key
//   const existing = await Domain.findOne({ key, _id: { $ne: id } });
//   if (existing)
//     return res.status(400).json({ success: false, message: 'Domain key already exists. Please use a unique key.' });

//   await Domain.findByIdAndUpdate(id, { name, key, iconClass });
//   res.json({ success: true, message: 'Domain updated.' });
// };


// 🔐 Admin - Update Domain with FAQs "section" keyword
exports.updateDomain = async (req, res) => {
  const { name, key, iconClass } = req.body;
  const { id } = req.params;

  if (!name || !key || !iconClass)
    return res.status(400).json({ success: false, message: 'Name, Key and Icon Class are required.' });

  const domain = await Domain.findById(id);
  if (!domain) return res.status(404).json({ success: false, message: 'Domain not found.' });

  // Check if key is changing
  const oldKey = domain.key;
  if (oldKey !== key) {
    // Check for duplicate key
    const existing = await Domain.findOne({ key, _id: { $ne: id } });
    if (existing) return res.status(400).json({ success: false, message: 'Key already exists for another domain.' });

    // Update all FAQs with the old key
    await FAQ.updateMany({ section: oldKey }, { section: key });
  }

  // Update the domain itself
  domain.name = name;
  domain.key = key;
  domain.iconClass = iconClass;
  await domain.save();

  res.json({ success: true, message: 'Domain and related FAQs updated successfully.' });
};



// // 🔐 Admin - Delete Domain
// exports.deleteDomain = async (req, res) => {
//   await Domain.findByIdAndDelete(req.params.id);
//   res.json({ success: true, message: 'Domain deleted.' });
// };


// 🔐 Admin - Delete Domain and associated FAQs
exports.deleteDomain = async (req, res) => {
  const domain = await Domain.findById(req.params.id);
  if (!domain) return res.status(404).json({ success: false, message: 'Domain not found.' });

  const deletedKey = domain.key;

  // Delete the domain
  await domain.deleteOne();

  // Delete all FAQs with matching section
  await FAQ.deleteMany({ section: deletedKey });

  res.json({ success: true, message: 'Domain and associated FAQs deleted.' });
};

