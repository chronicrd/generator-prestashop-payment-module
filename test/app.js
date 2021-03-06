'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-prestashop-payment-module:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
    .withPrompts({
      technicalName: 'dummymodule',
      displayName: 'Dummy Module',
      author: 'Marc Picaud',
      authorEmail: 'marc.picaud@prestashop.com',
      description: 'A very dummy module',
      // hooks: 'payment, paymentreturn, header, backOfficeHeader',
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

  it('generates the upgrade file', function () {
    assert.file([
      'dummymodule/upgrade/upgrade-1.1.0.php'
    ]);
  });

  it('places an index.php file in every directory', function () {
    assert.file([
      'dummymodule/index.php',
      'dummymodule/classes/index.php',
      'dummymodule/controllers/index.php',
      'dummymodule/controllers/front/index.php',
      'dummymodule/translations/index.php',
      'dummymodule/upgrade/index.php',
      'dummymodule/views/index.php',
      'dummymodule/views/js/index.php',
      'dummymodule/views/css/index.php',
      'dummymodule/views/templates/index.php',
      'dummymodule/views/templates/admin/index.php',
      'dummymodule/views/templates/front/index.php',
      'dummymodule/views/templates/hooks/index.php'
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

  it('generates the front controller to handle PSP response', function () {
    assert.file([
      'dummymodule/controllers/front/notification.php'
    ]);
  });

  it('generates a template payment.tpl', function () {
    assert.file([
      'dummymodule/views/templates/hooks/payment.tpl'
    ]);
  });
});
