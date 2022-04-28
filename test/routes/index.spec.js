const router = require('../../src/routes/index');

describe('router', () => {
  it('is a function', () => {
    expect(typeof router).toEqual('function');
  });

  it('has a /users route', () => {
    const route = router.stack.find((layer) => '/users'.match(layer.regexp));
    expect(route).toBeTruthy();
  });
});
