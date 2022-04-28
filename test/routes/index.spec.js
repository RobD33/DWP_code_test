const router = require('../../src/routes/index');

describe('router', () => {
  it('is a function', () => {
    expect(typeof router).toEqual('function');
  });

  it('has a /users route', () => {
    const route = router.stack.find((layer) => '/users'.match(layer.regexp));
    expect(route).toBeTruthy();
  });

  it('has a /swagger route', () => {
    const route = router.stack.find((layer) => '/swagger'.match(layer.regexp));
    expect(route).toBeTruthy();
  });

  it('handles not found route', () => {
    const route = router.stack.find((layer) => '/something'.match(layer.regexp));
    expect(route).toBeTruthy();
  });

  it('directs to another router for /users', () => {
    const { name } = router.stack.find((layer) => '/users'.match(layer.regexp));
    expect(name).toEqual('router')
  });
});
