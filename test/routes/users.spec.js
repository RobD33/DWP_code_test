const usersRouter = require('../../src/routes/users');

describe('usersRouter', () => {
  it('is a function', () => {
    expect(typeof usersRouter).toEqual('function');
  });

  it('has a / route with a get method', () => {
    const route = usersRouter.stack.find((layer) => '/'.match(layer.regexp));
    const { method } = route.route.stack[0];
    expect(route).toBeTruthy();
    expect(method).toEqual('get');
  });
});
