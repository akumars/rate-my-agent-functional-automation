import { expect } from 'chai'
import supertest from 'supertest'

const should = require('chai').should()


const api = supertest('https://api.ratemyagent.com.au')
let Cookies

describe('Get Session', () => {
  before((done) => {
    api.post('/Account/Login')
      .set('Content-Type', 'application/json')
      .send({
        email: 'sak.arun@gmail.com',
        password: 'Test007!',
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        Cookies = res.headers['set-cookie'].pop().split(';')[0]
        done()
      })
  })
})

exports.Cookies = Cookies
