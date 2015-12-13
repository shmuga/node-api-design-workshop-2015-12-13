'use strict';

const jsonApi = require('jsonapi-server');

jsonApi.listen = (port, cb) => {
  jsonApi.setConfig({ port , base: 'rest'});

  jsonApi.start();
  if (cb) {
    // will run after all callbacks
    process.nextTick(cb);
  }
}

const Joi = jsonApi.Joi;
jsonApi.define({
  resource: 'articles',
  handlers: new jsonApi.MemoryHandler(),
  attributes: {
    title: Joi.string().required(),
    body: Joi.string().required(),
    publishedAt: Joi.date().iso()
  },

  examples: [{
    id: '11', // should be a string for memory handler
    type: 'articles', // should be same as "resource"
    title: 'Hello World',
    body: 'Exciting'
  }, {
    id: '12', // should be a string for memory handler
    type: 'articles', // should be same as "resource"
    title: 'Fresh News',
    body: 'Intresting'
  }]
});

module.exports = jsonApi;
