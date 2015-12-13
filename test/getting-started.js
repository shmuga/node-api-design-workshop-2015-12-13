'use strict';
const chai = require('chai'),
  assert = chai.assert;

const fetch  = require('node-fetch');

const server = require('../src/hello-server'),
  co = require('co');

describe('hello world', () => {
  before(done => server.listen(4000, done));
  after(() => server.close());

  it('should respond to request', co.wrap(function* () {
      const response = yield fetch('http://localhost:4000');
      assert(response.ok, 'hello world response');
      const text = yield response.text();
      assert(text === 'Hello World\n', 'must return hello world');
    })
  );
});
