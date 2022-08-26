const express = require('express');
const router = express.Router();
const photoController = require('../controller/photo.controller');
const authMiddleware = require('../middleware/auth.middleware');
const {upload} = require('../middleware/uploaderMiddleware');

router.post('/photo', authMiddleware, upload.array("file"), photoController.uploadPhoto);
router.post('/photos', authMiddleware, upload.array("file"), photoController.uploadPhotos);
router.get('/photos/:id', authMiddleware, photoController.getPhotos);
router.get('/photo', authMiddleware, photoController.getOnePhoto);
router.put('/photo', authMiddleware, photoController.updatePhoto);
router.delete('/photo/:id', authMiddleware, photoController.deletePhoto);

module.exports = router;
