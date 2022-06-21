// import request from 'supertest'
// import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

describe('Signup Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('should first', () => { expect(1).toBe(1) })
  // test('Should return an account on success', async () => {
  //   const response = await request(app)
  //     .post('/api/signup')
  //     .send({
  //       name: 'Yuri',
  //       email: 'yuri.fernandes.961@gmail.com',
  //       password: 'any_password',
  //       passwordConfirmation: 'any_password'
  //     })
  //   expect(response.status).toBe(201)
  // })
})
