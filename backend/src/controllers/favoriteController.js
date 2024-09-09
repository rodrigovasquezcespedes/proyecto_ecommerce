import FavoriteModel from '../models/favoriteModel.js'

const addFavorite = async (req, res) => {
  const { userId, productId } = req.body
  try {
    const favorite = await FavoriteModel.addFavorite(userId, productId)
    res.status(201).json(favorite)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const removeFavorite = async (req, res) => {
  const { favoriteId } = req.params
  try {
    const favorite = await FavoriteModel.removeFavorite(favoriteId)
    res.status(200).json(favorite)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getFavoriteByProductId = async (req, res) => {
  const { userId, productId } = req.params
  try {
    const favorite = await FavoriteModel.getFavoriteByProductId(
      userId,
      productId
    )
    if (favorite) {
      res.status(200).json(favorite)
    } else {
      res.status(404).json({ message: 'Favorite not found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export default {
  addFavorite,
  removeFavorite,
  getFavoriteByProductId
}
