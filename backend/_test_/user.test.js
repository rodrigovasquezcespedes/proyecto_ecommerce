import request from 'supertest'
import app from '../src/app'
import db from '../src/config/db'
import bcrypt from 'bcrypt'

let token
let testUserId = 1

beforeAll(async () => {
  await db.connect()
  await db.clearDatabase()

  const loginResponse = await request(app)
    .post('/api/users/login')
    .send({ email: 'admin@example.com', password: 'admincl123' })
  token = loginResponse.body.token
})

afterAll(async () => {
  await db.closeDatabase()
})

describe('User Routes', () => {
  test('POST /api/register should create a new user and return status 201', async () => {
    const newUser = {
      username: 'testUser',
      email: 'testuser@example.com',
      password: 'testpassword'
    }
    const response = await request(app).post('/api/users/register').send(newUser)
    expect(response.statusCode).toBe(201)
    expect(response.body).toHaveProperty('username', newUser.username)
    expect(response.body).toHaveProperty('email', newUser.email)

    testUserId = response.body.id

    const registeredUser = await db.User.findById(testUserId)
    expect(registeredUser).toBeTruthy()
    const validPassword = await bcrypt.compare(
      newUser.password,
      registeredUser.password
    )
    expect(validPassword).toBe(true)
  })

  test('POST /api/login with valid credentials should return status 200 and a token', async () => {
    const credentials = {
      email: 'testuser@example.com',
      password: 'testpassword'
    }
    const response = await request(app).post('/api/users/login').send(credentials)
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('token')
    expect(typeof response.body.token).toBe('string')
  })

  test('PUT /api/users/:idUser should update an existing user and return status 200', async () => {
    const updatedUser = {
      username: 'updatedUser',
      email: 'updateduser@example.com',
      password: 'newpassword'
    }
    const response = await request(app)
      .put(`/users/${testUserId}`)
      .send(updatedUser)
      .set('Authorization', `Bearer ${token}`)
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('username', updatedUser.username)
    expect(response.body).toHaveProperty('email', updatedUser.email)
  })

  test('DELETE /api/users/:idUser should delete an existing user and return status 204', async () => {
    const response = await request(app)
      .delete(`/api/users/${testUserId}`)
      .set('Authorization', `Bearer ${token}`)
    expect(response.statusCode).toBe(204)
  })
})
