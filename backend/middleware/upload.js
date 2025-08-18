const multer = require('multer');

// Memory storage (no temp files on disk)
const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;
