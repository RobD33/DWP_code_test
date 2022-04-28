const notFound = require('../../src/routes/404');

describe('404', () => {
  it('is a function', () => {
    expect(typeof notFound).toEqual('function');
  });

  it('sends a 404 status and message', () => {
    const req = {};
    const send = jest.fn();
    const res = {
      status: jest.fn(() => ({
        send,
      })),
    };
    const next = jest.fn();
    notFound(req, res, next);
    expect(res.status).toHaveBeenLastCalledWith(404);
    expect(send).toHaveBeenLastCalledWith({ message: 'Page not found' });
    expect(next).not.toHaveBeenCalled();
  });
});
