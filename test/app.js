'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('generator-prestashop-payment-module:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
    .withOptions({someOption: true})
    .withPrompts({
      technicalName: 'dummymodule',
      className: 'DummyModule',
      displayName: 'Dummy Module',
      author: 'Marc Picaud',
      description: 'A very dummy module',
      msgUninstall: 'Are you sure?',
      paymentProviderClass: 'DummyPaymentProviderClass'
    })
    .on('end', done);
  });

  it('generates the module main PHP file', function () {
    assert.file([
      'dummymodule/dummymodule.php'
    ]);
  });

  it('generates the payment provider class file', function () {
    assert.file([
      'dummymodule/classes/DummyPaymentProviderClass.php'
    ]);
  });

  it('generates a front controller system to redirect clients towards the payment provider', function () {
    assert.file([
      'dummymodule/controllers/front/redirect.php',
      'dummymodule/views/templates/front/redirect.tpl'
    ]);
  });

  it('generates a template payment.tpl', function () {
    assert.file([
      'dummymodule/views/templates/hooks/payment.tpl'
    ]);
  });
});
