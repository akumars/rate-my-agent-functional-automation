import { expect } from 'chai'
import supertest from 'supertest'
import dotenv from 'dotenv'

let Cookies
dotenv.config()
const api = supertest(process.env.ENDPOINT)

describe('Adding agents to shortlist', () => {
  before((done) => {
    api.post('/Account/Login')
      .set('Content-Type', 'application/json')
      .send({
        email: process.env.EMAIL,
        password: process.env.PASSWORD,
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        Cookies = res.headers['set-cookie'].pop().split(';')[0]
        done()
      })
  })

  it('should return a 200 response for success', (done) => {
    api.put('/Users/Me/Shortlist/Agents/Code-bm813')
      .set('Cookie', Cookies)
      .set('Content-Type', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body.IsSuccessful).to.equal(true)
        expect(res.body.Status).to.equal('Success')
        done()
      })
  })

  it('should return a 404 response for invalid agent', (done) => {
    api.put('/Users/Me/Shortlist/Agents/Code-bm813xxx')
      .set('Cookie', Cookies)
      .set('Content-Type', 'application/json')
      .expect(404)
      .end((err, res) => {
        expect(res.body.Message).to.equal('Unable to locate agent')
        done()
      })
  })

  // SHOULD IT???
  it('should return a 500 response for invalid agent with special characters', (done) => {
    api.put('/Users/Me/Shortlist/Agents/Code-$#$')
      .set('Cookie', Cookies)
      .set('Content-Type', 'application/json')
      .expect(500, done)
  })

  it('should return a 400 response when agent code is not specified', (done) => {
    api.put('/Users/Me/Shortlist/Agents')
      .set('Cookie', Cookies)
      .set('Content-Type', 'application/json')
      .expect(400)
      .end((err, res) => {
        expect(res.body.Error.Code).to.equal('UnsupportedApiVersion')
        done()
      })
  })

  it('should return a 401 response for authentication failure', (done) => {
    api.put('/Users/Me/Shortlist/Agents/Code-bm813')
      .set('Content-Type', 'application/json')
      .expect(401)
      .end((err, res) => {
        expect(res.body.Message).to.equal('Authorization has been denied for this request.')
        done()
      })
  })
})

describe('Fetching shortlisted agents', () => {
  it('should return a 200 response for successful fetch with no pagination in query param', (done) => {
    const req = api.get('/Users/Me/Shortlist/Agents')
    req.cookies = Cookies
    req.set('Content-Type', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body.Results).to.be.an('array')
        expect(res.body.Results[0].AgentCode).to.equal('bm813')
        expect(res.body.Results[0].AgentTitle).to.equal('Sales Manager')
        expect(res.body.Results[0].AgentName).to.equal('Peter Doan')
        expect(res.body.Results[0].AgencyName).to.equal('MICM Real Estate - Head Office')
        expect(res.body.Results[0].IsAwardWinner).to.equal(true)
        expect(res.body.Results[0].CanContact).to.equal(true)
        expect(res.body.Results[0].Mobile).to.equal('0402 959 842')
        expect(res.body.Total).to.equal(1)
        expect(res.body.Take).to.equal(10)
        expect(res.body.Skip).to.equal(0)
        done()
      })
  })

  it('should return a 200 response for successful fetch with pagination in query param', (done) => {
    const req = api.get('/Users/Me/Shortlist/Agents?skip=0&take=5')
    req.cookies = Cookies
    req.set('Content-Type', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body.Results).to.be.an('array')
        expect(res.body.Results[0].AgentCode).to.equal('bm813')
        expect(res.body.Results[0].AgentTitle).to.equal('Sales Manager')
        expect(res.body.Results[0].AgentName).to.equal('Peter Doan')
        expect(res.body.Results[0].AgencyName).to.equal('MICM Real Estate - Head Office')
        expect(res.body.Results[0].IsAwardWinner).to.equal(true)
        expect(res.body.Results[0].CanContact).to.equal(true)
        expect(res.body.Results[0].Mobile).to.equal('0402 959 842')
        expect(res.body.Total).to.equal(1)
        expect(res.body.Take).to.equal(5)
        expect(res.body.Skip).to.equal(0)
        done()
      })
  })

  it('should return a 200 response for successful fetch with invalid pagination in query param', (done) => {
    const req = api.get('/Users/Me/Shortlist/Agents?skip=%$&take=*&')
    req.cookies = Cookies
    req.set('Content-Type', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body.Results).to.be.an('array')
        expect(res.body.Results[0].AgentCode).to.equal('bm813')
        expect(res.body.Results[0].AgentTitle).to.equal('Sales Manager')
        expect(res.body.Results[0].AgentName).to.equal('Peter Doan')
        expect(res.body.Results[0].AgencyName).to.equal('MICM Real Estate - Head Office')
        expect(res.body.Results[0].IsAwardWinner).to.equal(true)
        expect(res.body.Results[0].CanContact).to.equal(true)
        expect(res.body.Results[0].Mobile).to.equal('0402 959 842')
        expect(res.body.Total).to.equal(1)
        expect(res.body.Take).to.equal(10)
        expect(res.body.Skip).to.equal(0)
        done()
      })
  })

  it('should return a 400 response for authentication failure', (done) => {
    const req = api.get('/Users/Me/Shortlist/Agents')
    req.set('Content-Type', 'application/json')
      .expect(400)
      .end((err, res) => {
        expect(res.body.Message).to.equal('Please login or provide agents you wish to see via shortlist.')
        expect(res.body.IsSuccessful).to.equal(false)
        expect(res.body.Status).to.equal('Invalid')
        done()
      })
  })
})

describe('Fetch a particular shortlist agent with no authentication', () => {
  it('should return a 200 response for successful fetch', (done) => {
    const req = api.get('/Users/Me/Shortlist/Agents?agentCodes=bm813')
    // WORKS WITHOUT AUTHENTICATION
    // req.cookies = Cookies
    req.set('Content-Type', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body.Results).to.be.an('array')
        expect(res.body.Results[0].AgentCode).to.equal('bm813')
        expect(res.body.Results[0].AgentTitle).to.equal('Sales Manager')
        expect(res.body.Results[0].AgentName).to.equal('Peter Doan')
        expect(res.body.Results[0].AgencyName).to.equal('MICM Real Estate - Head Office')
        expect(res.body.Results[0].IsAwardWinner).to.equal(true)
        expect(res.body.Results[0].CanContact).to.equal(true)
        expect(res.body.Results[0].Mobile).to.equal('0402 959 842')
        expect(res.body.Total).to.equal(1)
        expect(res.body.Take).to.equal(10)
        expect(res.body.Skip).to.equal(0)
        done()
      })
  })

  it('should return a 200 response for invalid agent', (done) => {
    api.get('/Users/Me/Shortlist/Agents?agentCodes=bm813xxx')
      .set('Content-Type', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body.Results).to.be.an('array').with.length(0)
        expect(res.body.Total).to.equal(0)
        expect(res.body.Take).to.equal(10)
        expect(res.body.Skip).to.equal(0)
        done()
      })
  })

  // SHOULD IT???
  it('should return a 500 response for invalid agent with special characters', (done) => {
    const req = api.get('/Users/Me/Shortlist/Agents?agentCodes=$#$')
    req.set('Content-Type', 'application/json')
      .expect(500, done)
  })
})

describe('Remove agent from shortlist', () => {
  it('should return a 200 response for success', (done) => {
    const req = api.delete('/Users/Me/Shortlist/Agents/Code-bm813')
    req.cookies = Cookies
    req.set('Content-Type', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body.IsSuccessful).to.equal(true)
        expect(res.body.Status).to.equal('Success')
        done()
      })
  })

  // SHOULD IT?? should be 404 ??
  it('should return a 200 response for invalid agent', (done) => {
    api.delete('/Users/Me/Shortlist/Agents/Code-bm813xxx')
      .set('Cookie', Cookies)
      .set('Content-Type', 'application/json')
      .expect(200, done)
  })

  // SHOULD IT???
  it('should return a 500 response for invalid agent with special characters', (done) => {
    const req = api.delete('/Users/Me/Shortlist/Agents/Code-$#$')
    req.cookies = Cookies
    req.set('Content-Type', 'application/json')
      .expect(500, done)
  })

  it('should return a 400 response when agent code is not specified', (done) => {
    const req = api.delete('/Users/Me/Shortlist/Agents')
    req.cookies = Cookies
    req.set('Content-Type', 'application/json')
      .expect(400)
      .end((err, res) => {
        expect(res.body.Error.Code).to.equal('UnsupportedApiVersion')
        done()
      })
  })

  it('should return a 401 response for authentication failure', (done) => {
    const req = api.delete('/Users/Me/Shortlist/Agents/Code-bm813')
    req.set('Content-Type', 'application/json')
      .expect(401)
      .end((err, res) => {
        expect(res.body.Message).to.equal('Authorization has been denied for this request.')
        done()
      })
  })
})
