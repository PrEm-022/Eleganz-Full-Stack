// @desc    Upload image
// @route   POST /upload or /api/upload
// @access  Public
const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: 0, message: "No file uploaded" });
  }

  const protocol = req.headers['x-forwarded-proto'] || req.protocol;
  const host = req.get('host');
  const imageUrl = `${protocol}://${host}/images/${req.file.filename}`;

  res.json({
    success: 1,
    image_url: imageUrl,
  });
};

module.exports = {
  uploadImage,
};
