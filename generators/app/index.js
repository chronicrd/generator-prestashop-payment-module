'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');

module.exports = yeoman.generators.Base.extend({
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
        message: 'Technical Name (lowercase)',
        default: 'mymodule'
      },
      {
        type: 'input',
        name: 'className',
        message: 'Class Name',
        default: 'className'
      },
      {
        type: 'input',
        name: 'displayName',
        message: 'Display Name',
        default: 'mymodule'
      },
      {
        type: 'input',
        name: 'author',
        message: 'Author',
        default: 'Yeoman'
      },
      {
        type: 'input',
        name: 'description',
        message: 'description',
        default: 'Awesome module'
      },
      {
        type: 'input',
        name: 'msgUninstall',
        message: 'Confirm Uninstall message',
        default: 'This module will be removed from your store. Are you sure?'
      },
      {
        type: 'input',
        name: 'paymentProviderClass',
        message: 'Payment provider class name (in camelCase)',
        default: 'PaymentProvider'
      }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: function () {
    var modulePath = this.destinationRoot() + '/' + this.props.technicalName;

    // Creates the module hierarchy
    mkdirp(modulePath);
    mkdirp(modulePath + '/classes');
    mkdirp(modulePath + '/controllers/front');
    mkdirp(modulePath + '/controllers/back');
    mkdirp(modulePath + '/views/css');
    mkdirp(modulePath + '/views/js');
    mkdirp(modulePath + '/views/templates/admin');
    mkdirp(modulePath + '/views/templates/front');
    mkdirp(modulePath + '/views/templates/hooks');

    // Generates files
    this.fs.copyTpl(
      this.templatePath('mymodule.php'),
      modulePath + '/' + this.props.technicalName + '.php', {
        technicalName: this.props.technicalName,
        paymentProviderClass: this.props.paymentProviderClass,
        className: this.props.className,
        displayName: this.props.displayName,
        author: this.props.author,
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
        paymentProviderClass: this.props.paymentProviderClass
      }
    );

    this.fs.copyTpl(
      this.templatePath('controllers/front/redirect.php'),
      modulePath + '/controllers/front/redirect.php', {
        paymentProviderClass: this.props.paymentProviderClass,
        className: this.props.className
      }
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
  }
});
