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
        var prompts = [{
            type: 'input',
            name: 'technicalName',
            message: 'Technical Name (lowercase)',
            default: 'mymodule'
        },
        {
            type: 'input',
            name: 'className',
            message: 'Class Name',
            default: 'className', 
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
            name: 'paymentProviderClass',
            message: 'Payment provider class name (in camelCase)',
            default: 'PaymentProvider'
        }];

        this.prompt(prompts, function (props) {
            this.props = props;
            // To access props later use this.props.someOption;

            done();
        }.bind(this));
    },

    writing: function () {
        var module_path = this.destinationRoot() + '/' + this.props.technicalName;

        // Creates the module hierarchy
        mkdirp(module_path);
        mkdirp(module_path + '/' + 'classes');
        mkdirp(module_path + '/' + 'controllers/front');
        mkdirp(module_path + '/' + 'controllers/back');
        mkdirp(module_path + '/' + 'views/css');
        mkdirp(module_path + '/' + 'views/js');
        mkdirp(module_path + '/' + 'views/templates/admin');
        mkdirp(module_path + '/' + 'views/templates/front');
        mkdirp(module_path + '/' + 'views/templates/hooks');

        // Generates files
        this.fs.copyTpl(
            this.templatePath('mymodule.php'),
            module_path + '/' + this.props.technicalName + '.php', {
                technicalName: this.props.technicalName,
                paymentProviderClass: this.props.paymentProviderClass,
                className: this.props.className,
                displayName: this.props.displayName,
                author: this.props.author,
                description: this.props.description
            }
        );

        this.fs.copyTpl(
            this.templatePath('README.md'),
            module_path + '/README.md', {
                technicalName: this.props.technicalName,
            }
        );

        this.fs.copyTpl(
            this.templatePath('classes/PaymentProviderApi.php'),
            module_path + '/classes/' + this.props.paymentProviderClass + '.php', {
                paymentProviderClass: this.props.paymentProviderClass
            }
        );

        this.fs.copyTpl(
            this.templatePath('controllers/front/redirect.php'),
            module_path + '/controllers/front/redirect.php', {
                paymentProviderClass: this.props.paymentProviderClass,
                className: this.props.className
            }
        );

        this.fs.copy(
            this.templatePath('views/css/back.css'),
            module_path + '/views/css/back.css'
        );

        this.fs.copy(
            this.templatePath('views/css/front.css'),
            module_path + '/views/css/front.css'
        );

        this.fs.copy(
            this.templatePath('views/js/back.js'),
            module_path + '/views/js/back.js'
        );

        this.fs.copy(
            this.templatePath('views/js/front.js'),
            module_path + '/views/js/front.js'
        );

        this.fs.copyTpl(
            this.templatePath('views/templates/front/redirect.tpl'),
            module_path + '/views/templates/front/redirect.tpl', {
                technicalName: this.props.technicalName
            }
        );

        this.fs.copyTpl(
            this.templatePath('views/templates/hooks/payment.tpl'),
            module_path + '/views/templates/hooks/payment.tpl', {
                technicalName: this.props.technicalName
            }
        );
    },
});
