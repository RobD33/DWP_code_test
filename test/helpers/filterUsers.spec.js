const filterUsers = require('../../src/helpers/filterUsers');

describe('filterUsers', () => {
  it('is a function', () => {
    expect(typeof filterUsers).toEqual('function');
  });
});
