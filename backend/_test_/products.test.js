import app from '../src/app'
import request from 'supertest'

describe('Product Routes', () => {
  let testProductId = 65

  test('POST /api/products debe crear un nuevo producto y devolver 201', async () => {
    const newProduct = {
      name: 'tv',
      description: 'tv ',
      price: 1990,
      stock: 1,
      imageUrl:
        'https://i.etsystatic.com/23192778/r/il/a83877/3367328908/il_1140xN.3367328908_r3yf.jpg',
      brand: 'chancho',
      categoryId: 5,
      specifications: [
        { Tipo: 'Streaming' },
        { 'Conectividad/conexión': 'Inalámbrico' },
        { 'Garantía del proveedor': '12 meses' },
        { Modelo: 'MN873CI/A' },
        { 'Incluye parlantes': 'Si' }
      ]
    }
    const response = await request(app).post('/api/products').send(newProduct)
    expect(response.statusCode).toBe(201)
    expect(response.body).toHaveProperty('name', newProduct.name)
    expect(response.body).toHaveProperty('price', newProduct.price)

    testProductId = response.body.id
  })

  test('GET /api/products debe devolver una lista de productos y un status 200', async () => {
    const response = await request(app).get('/api/products')
    expect(response.statusCode).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
  })

  test('GET /api/products/:productId debe devolver un productos y estatus 200', async () => {
    const response = await request(app).get(`/api/products/${testProductId}`)
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('id', testProductId)
  })

  test('PUT /api/products/:productId debe actualizar un producto y status 200', async () => {
    const updatedProduct = {
      name: 'Updated Product',
      price: 150
    }
    const response = await request(app)
      .put(`/api/products/${testProductId}`)
      .send(updatedProduct)
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('name', updatedProduct.name)
    expect(response.body).toHaveProperty('price', updatedProduct.price)
  })

  test('DELETE /api/products/:productId debe eliminar un producto y status 204', async () => {
    const response = await request(app).delete(`/api/products/${testProductId}`)
    expect(response.statusCode).toBe(204)
  })
})
