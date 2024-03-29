import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'

let accountCollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return 201 on signup', async () => {
      const response = await request(app)
        .post('/api/signup')
        .send({
          name: 'Yuri',
          email: 'yuri.fernandes.961@gmail.com',
          password: 'any_password',
          passwordConfirmation: 'any_password'
        })
      expect(response.status).toBe(201)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('any_password', 12)
      await accountCollection.insertOne({
        name: 'Yuri',
        email: 'yuri.fernandes.961@gmail.com',
        password
      })
      const response = await request(app)
        .post('/api/login')
        .send({
          email: 'yuri.fernandes.961@gmail.com',
          password: 'any_password',
        })
      expect(response.status).toBe(200)
    })
    test('Should return 401 on login', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({
          email: 'yuri.fernandes.961@gmail.com',
          password: 'any_password',
        })
      expect(response.status).toBe(401)
    })
  })
})
