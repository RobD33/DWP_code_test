const logger = require('../../src/middleware/logger');

describe('middleware logger', () => {
  it('is a function', () => {
    expect(typeof logger).toEqual('function')
  })
})
