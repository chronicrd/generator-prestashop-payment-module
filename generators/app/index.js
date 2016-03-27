'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');
var validator = require('validator');
var _ = require('lodash');

function pascalCasify(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = yeoman.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the terrific ' + chalk.red('Payment Module') + ' generator!'
    ));

    // Prompt the name of the module
    var prompts = [
      {
        type: 'input',
        name: 'technicalName',
        message: 'Technical Name (5 to 15 lowercase letters)',
        validate: function (str) {
          return validator.isAlpha(str, 'en-US') && validator.isLength(str, {min: 5, max: 15}) && validator.isLowercase(str);
        },
        default: 'mymodule'
      },
      {
        type: 'input',
        name: 'displayName',
        message: 'Display Name',
        validate: function (str) {
          return validator.isLength(str, {min: 5, max: 100});
        },
        default: 'My Module'
      },
      {
        type: 'input',
        name: 'author',
        message: 'Author',
        validate: function (str) {
          return validator.isLength(str, {min: 1, max: 30});
        },
        filter: function (str) {
          return _.startCase(str);
        },
        default: 'Yeoman'
      },
      {
        type: 'input',
        name: 'authorEmail',
        message: 'Author Email',
        validate: function (str) {
          return validator.isEmail(str);
        },
        default: 'contact@prestashop.com'
      },
      {
        type: 'input',
        name: 'description',
        message: 'description',
        validate: function (str) {
          return validator.isLength(str, {min: 1, max: 200});
        },
        default: 'This module is amazing'
      },
      {
        type: 'checkbox',
        name: 'hooks',
        message: 'Select hooks',
        choices: [
          {name: 'payment', checked: true},
          {name: 'paymentreturn', checked: true},
          {name: 'header', checked: true},
          {name: 'backOfficeHeader', checked: true}
        ]
      },
      {
        type: 'input',
        name: 'msgUninstall',
        message: 'Confirm Uninstall message',
        validate: function (str) {
          return validator.isLength(str, {min: 1, max: 200});
        },
        default: 'This module will be removed from your store. Are you sure?'
      },
      {
        type: 'input',
        name: 'paymentProviderClass',
        message: 'Payment provider name',
        filter: function (str) {
          return pascalCasify(str.replace(/\s+/g, ''));
        },
        default: 'PaymentProvider'
      }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      this.props.className = pascalCasify(this.props.technicalName);
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: function () {
    var modulePath = this.destinationRoot() + '/' + this.props.technicalName;

    // Creates the module hierarchy
    mkdirp(modulePath);
    mkdirp(modulePath + '/classes');
    mkdirp(modulePath + '/upgrade');
    mkdirp(modulePath + '/translations');
    mkdirp(modulePath + '/controllers/front');
    mkdirp(modulePath + '/controllers/back');
    mkdirp(modulePath + '/views/css');
    mkdirp(modulePath + '/views/js');
    mkdirp(modulePath + '/views/templates/admin');
    mkdirp(modulePath + '/views/templates/front');
    mkdirp(modulePath + '/views/templates/hooks');

    var nameUpper = this.props.technicalName.toUpperCase();
    var moduleFileName = this.props.technicalName + '.php';
    // Generates files
    this.fs.copyTpl(
      this.templatePath('mymodule.php'),
      modulePath + '/' + moduleFileName, {
        filename: moduleFileName,
        technicalName: this.props.technicalName,
        technicalNameUpperCase: nameUpper,
        paymentProviderClass: this.props.paymentProviderClass,
        className: this.props.className,
        displayName: this.props.displayName,
        author: this.props.author,
        authorEmail: this.props.authorEmail,
        description: this.props.description,
        msgUninstall: this.props.msgUninstall
      }
    );

    this.fs.copyTpl(
      this.templatePath('README.md'),
      modulePath + '/README.md', {
        technicalName: this.props.technicalName
      }
    );

    this.fs.copyTpl(
      this.templatePath('classes/PaymentProviderApi.php'),
      modulePath + '/classes/' + this.props.paymentProviderClass + '.php', {
        filename: this.props.paymentProviderClass + '.php',
        author: this.props.author,
        authorEmail: this.props.authorEmail,
        paymentProviderClass: this.props.paymentProviderClass,
        technicalNameUpperCase: nameUpper
      }
    );

    this.fs.copyTpl(
      this.templatePath('controllers/front/redirect.php'),
      modulePath + '/controllers/front/redirect.php', {
        filename: 'redirect.php',
        author: this.props.author,
        authorEmail: this.props.authorEmail,
        paymentProviderClass: this.props.paymentProviderClass,
        className: this.props.className
      }
    );

    this.fs.copyTpl(
      this.templatePath('controllers/front/notification.php'),
      modulePath + '/controllers/front/notification.php', {
        filename: 'notification.php',
        className: this.props.className,
        author: this.props.author,
        authorEmail: this.props.authorEmail,
        technicalName: this.props.technicalName
      }
    );

    this.fs.copy(
      this.templatePath('upgrade/upgrade-1.1.0.php'),
      modulePath + '/upgrade/upgrade-1.1.0.php'
    );

    this.fs.copy(
      this.templatePath('views/css/back.css'),
      modulePath + '/views/css/back.css'
    );

    this.fs.copy(
      this.templatePath('views/css/front.css'),
      modulePath + '/views/css/front.css'
    );

    this.fs.copy(
      this.templatePath('views/js/back.js'),
      modulePath + '/views/js/back.js'
    );

    this.fs.copy(
      this.templatePath('views/js/front.js'),
      modulePath + '/views/js/front.js'
    );

    this.fs.copyTpl(
      this.templatePath('views/templates/front/redirect.tpl'),
      modulePath + '/views/templates/front/redirect.tpl', {
        technicalName: this.props.technicalName
      }
    );

    this.fs.copyTpl(
      this.templatePath('views/templates/hooks/payment.tpl'),
      modulePath + '/views/templates/hooks/payment.tpl', {
        technicalName: this.props.technicalName
      }
    );

    this.fs.copy(
      this.templatePath('index.php'),
      modulePath + '/index.php'
    );

    this.fs.copy(
      this.templatePath('index.php'),
      modulePath + '/classes/index.php'
    );

    this.fs.copy(
      this.templatePath('index.php'),
      modulePath + '/controllers/index.php'
    );

    this.fs.copy(
      this.templatePath('index.php'),
      modulePath + '/controllers/front/index.php'
    );

    this.fs.copy(
      this.templatePath('index.php'),
      modulePath + '/translations/index.php'
    );

    this.fs.copy(
      this.templatePath('index.php'),
      modulePath + '/upgrade/index.php'
    );
    this.fs.copy(
      this.templatePath('index.php'),
      modulePath + '/views/index.php'
    );

    this.fs.copy(
      this.templatePath('index.php'),
      modulePath + '/views/css/index.php'
    );

    this.fs.copy(
      this.templatePath('index.php'),
      modulePath + '/views/js/index.php'
    );

    this.fs.copy(
      this.templatePath('index.php'),
      modulePath + '/views/templates/index.php'
    );

    this.fs.copy(
      this.templatePath('index.php'),
      modulePath + '/views/templates/admin/index.php'
    );

    this.fs.copy(
      this.templatePath('index.php'),
      modulePath + '/views/templates/front/index.php'
    );

    this.fs.copy(
      this.templatePath('index.php'),
      modulePath + '/views/templates/hooks/index.php'
    );
  }
});
