'use strict';

const supertest = require('supertest');
const test = require('unit.js');
const app = require('../app.js');

const request = supertest(app);
describe('Tests app', function() {
  it('verifies get', function(done) {
    this.timeout(10000);
    request.get('/notes').expect(200).end(function(err, result) {
        test.string(result.body.Status).contains('ok');
        test.value(result).hasHeader('content-type', 'application/json; charset=utf-8');
        done(err);
    });
  });
});
