const request = require('supertest')
const app = require('../index')
const { fakerDE: faker } = require('@faker-js/faker')



describe('Operaciones CRUD de cafes', () => {
  describe('GET /cafes', () => {
    it('/cafes returns code 200', async () => {
      const response = await request(app).get('/cafes')
      const status = response.statusCode
      expect(status).toBe(200)
    })

    it('is instance of array', async () => {
      const response = await request(app).get('/cafes')
      const cafes = response.body
      expect(cafes).toBeInstanceOf(Array)
    })

    it('is not an empty array', async () => {
      const response = await request(app).get('/cafes')
      const cafes = response.body
      expect(cafes.length).toBeGreaterThan(0)
    })
  })

  describe('DELETE /cafes/${id}', () => {
    it('delete non-existent coffee returns 404', async () => {
      const token = faker.string.alphanumeric()
      const id = 800
      const response = await request(app)
        .delete(`/cafes/${id}`)
        .set('Authorization', token)
        .send()
      const status = response.statusCode
      expect(status).toBe(404)
    })
  })

  describe('POST /cafes', () => {
    it('add new coffee returns 201 code', async () => {
      const id = faker.number.int({ min: 100, max: 500 })
      const cafe = { id, nombre: 'New coffee' }
      const response = await request(app).post('/cafes').send(cafe)
      const status = response.statusCode
      expect(status).toBe(201)
    })
  })

  describe('PUT /cafes', () => {
    it('update coffee with different id returns 400 code', async () => {
      const differentIdCoffee = { id: 1, nombre: 'Cortado' }
      const response = await request(app)
        .put('/cafes/2')
        .send(differentIdCoffee)
      const status = response.statusCode
      expect(status).toBe(400)
    })
  })
})
