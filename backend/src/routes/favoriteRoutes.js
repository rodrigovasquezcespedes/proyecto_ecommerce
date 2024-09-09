import express from 'express'
import FavoriteController from '../controllers/favoriteController.js'

const router = express.Router()

router.post('/favorites', FavoriteController.addFavorite)
router.delete('/favorites/:favoriteId', FavoriteController.removeFavorite)
router.get('/favorites/:userId/:productId', FavoriteController.getFavoriteByProductId)

export default router
