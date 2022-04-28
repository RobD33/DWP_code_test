const errorHandler = require('../../src/middleware/errorHandler');

describe('errorHandler', () => {
  it('is a function', () => {
    expect(typeof errorHandler).toEqual('function');
  });
});
