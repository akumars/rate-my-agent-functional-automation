import { expect } from 'chai'
import Cookies from './get-session'
import { api } from './get-endpoint'

describe('Adding agents to shortlist', () => {
  it('should return a 200 response for success', (done) => {
    const req = api.put('/Users/Me/Shortlist/Agents/Code-bm813')
    req.cookies = Cookies
    req.set('Content-Type', 'application/json')
      .expect(200, done)
      .end((err, res) => {
        console.log(res)
        // expect(res.body.IsSuccessful).to.equal(true)
        // expect(res.body.Status).to.equal('Success')
        done()
      })
  })
  it('should return a 404 response for invalid agent', (done) => {
    api.put('/Users/Me/Shortlist/Agents/Code-bm813xxx')
      .set('Cookie', Cookies)
      .set('Content-Type', 'application/json')
      .expect(404, done)
      .end((err, res) => {
        console.log(res)
        // expect(res.body.IsSuccessful).to.equal(true)
        expect(res.body.Message).to.equal('Unable to locate agent')
        done()
      })
  })
  // SHOULD IT???
  it('should return a 500 response for invalid agent with special characters', (done) => {
    const req = api.put('/Users/Me/Shortlist/Agents/Code-$#$')
    req.cookies = Cookies
    req.set('Content-Type', 'application/json')
      .expect(500, done)
  })
  it('should return a 400 response when agent code is not specified', (done) => {
    const req = api.put('/Users/Me/Shortlist/Agents')
    req.cookies = Cookies
    req.set('Content-Type', 'application/json')
      .expect(400, done)
  })
  it('should return a 401 response for authentication failure', (done) => {
    const req = api.put('/Users/Me/Shortlist/Agents/Code-bm813')
    req.set('Content-Type', 'application/json')
      .expect(401, done)
  })
})

describe('Fetching shortlisted agents', () => {
  it('should return a 200 response for successful fetch with no pagination in query param', (done) => {
    const req = api.get('/Users/Me/Shortlist/Agents')
    req.cookies = Cookies
    req.set('Content-Type', 'application/json')
      .expect(200, done)
      .end((err, res) => {
        console.log(res)
        // validate response body here
        done()
      })
  })
  it('should return a 200 response for successful fetch with pagination in query param', (done) => {
    const req = api.get('/Users/Me/Shortlist/Agents?skip=0&take=10')
    req.cookies = Cookies
    req.set('Content-Type', 'application/json')
      .expect(200, done)
      .end((err, res) => {
        console.log(res)
        // validate response body here
        done()
      })
  })
  it('should return a 200 response for successful fetch with invalid pagination in query param', (done) => {
    const req = api.get('/Users/Me/Shortlist/Agents?skip=%$&take=*&')
    req.cookies = Cookies
    req.set('Content-Type', 'application/json')
      .expect(200, done)
      .end((err, res) => {
        console.log(res)
        // validate response body here
        done()
      })
  })
  it('should return a 401 response for authentication failure', (done) => {
    const req = api.put('/Users/Me/Shortlist/Agents')
    req.set('Content-Type', 'application/json')
      .expect(401, done)
  })
})

describe('Fetch a particular shortlist agent', () => {
  it('should return a 200 response for successful fetch', (done) => {
    const req = api.get('/Users/Me/Shortlist/Agents/Code-bm813')
    // WORKS WITHOUT AUTHENTICATION
    // req.cookies = Cookies
    req.set('Content-Type', 'application/json')
      .expect(200, done)
      .end((err, res) => {
        console.log(res)
        // validate response body here
        done()
      })
  })
  it('should return a 404 response for invalid agent', (done) => {
    api.get('/Users/Me/Shortlist/Agents/Code-bm813xxx')
      .set('Cookie', Cookies)
      .set('Content-Type', 'application/json')
      .expect(404, done)
      .end((err, res) => {
        console.log(res)
        // expect(res.body.IsSuccessful).to.equal(true)
        expect(res.body.Message).to.equal('Unable to locate agent')
        done()
      })
  })
  // SHOULD IT???
  it('should return a 500 response for invalid agent with special characters', (done) => {
    const req = api.get('/Users/Me/Shortlist/Agents/Code-$#$')
    req.cookies = Cookies
    req.set('Content-Type', 'application/json')
      .expect(500, done)
  })
})

describe('Remove agent from shortlist', () => {
  it('should return a 200 response for success', (done) => {
    const req = api.delete('/Users/Me/Shortlist/Agents/Code-bm813')
    req.cookies = Cookies
    req.set('Content-Type', 'application/json')
      .expect(200, done)
      .end((err, res) => {
        console.log(res)
        // expect(res.body.IsSuccessful).to.equal(true)
        // expect(res.body.Status).to.equal('Success')
        done()
      })
  })
  it('should return a 404 response for invalid agent', (done) => {
    api.delete('/Users/Me/Shortlist/Agents/Code-bm813xxx')
      .set('Cookie', Cookies)
      .set('Content-Type', 'application/json')
      .expect(404, done)
      .end((err, res) => {
        console.log(res)
        // expect(res.body.IsSuccessful).to.equal(true)
        expect(res.body.Message).to.equal('Unable to locate agent')
        done()
      })
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
      .expect(400, done)
  })
  it('should return a 401 response for authentication failure', (done) => {
    const req = api.delete('/Users/Me/Shortlist/Agents/Code-bm813')
    req.set('Content-Type', 'application/json')
      .expect(401, done)
  })
})
