import { api } from './get-endpoint'

let Cookies

describe('Get Session', () => {
  before((done) => {
    api.post('/Account/Login')
      .set('Content-Type', 'application/json')
      .send({
        email: 'sak_arun2000@yahoo.com',
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
