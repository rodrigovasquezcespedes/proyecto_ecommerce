import app from '../src/app'
import request from 'supertest'

describe('Favorite Routes', () => {
  let testFavoriteId
  const userId = 1
  const productId = 1

  test('POST /api/favorites debería agregar un favorito y devolver el estado 201', async () => {
    const response = await request(app)
      .post('/api/favorites')
      .send({ userId, productId })
    expect(response.statusCode).toBe(201)
    expect(response.body).toHaveProperty('userId', userId)
    expect(response.body).toHaveProperty('productId', productId)

    testFavoriteId = response.body.id
  })

  test('GET /api/favorites/:userId/:productId should return a favorite and status 200', async () => {
    const response = await request(app).get(
      `/api/favorites/${userId}/${productId}`
    )
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('userId', userId)
    expect(response.body).toHaveProperty('productId', productId)
  })

  test('DELETE /api/favorites/:favoriteId debería devolver un favorito y estado 200', async () => {
    const response = await request(app).delete(
      `/api/favorites/${testFavoriteId}`
    )
    expect(response.statusCode).toBe(204)
  })
})
