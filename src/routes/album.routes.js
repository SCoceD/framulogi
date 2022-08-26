const express = require('express');
const router = express.Router();
const albumController = require('../controller/album.controller');
const authMiddleware = require('../middleware/auth.middleware')

router.post('/album', authMiddleware, albumController.createAlbum);
router.get('/albums', authMiddleware, albumController.getAlbums);
router.get('/album/:id', authMiddleware, albumController.getOneAlbum);
router.put('/album', authMiddleware, albumController.updateAlbum);
router.delete('/album/:id', authMiddleware, albumController.deleteAlbum);

module.exports = router;
