#generator-prestashop-payment-module
[![Build Status](https://travis-ci.org/marcpicaud/generator-prestashop-payment-module.svg?branch=master)](https://travis-ci.org/marcpicaud/generator-prestashop-payment-module)[![npm version](https://badge.fury.io/js/generator-prestashop-payment-module.svg)](https://badge.fury.io/js/generator-prestashop-payment-module)[![Coverage Status](https://coveralls.io/repos/github/marcpicaud/generator-prestashop-payment-module/badge.svg?branch=master)](https://coveralls.io/github/marcpicaud/generator-prestashop-payment-module?branch=master)
> Yeoman generator for PrestaShop - lets you quickly set up a payment module

Payment modules for [PrestaShop](https://www.prestashop.com/) almost always share the same architecture and it's painful to write them from scratch for each new payment provider.

This project generates a well architectured payment module which follows the PrestaShop best practices. It lets you focus on the implementation of the payment provider API and the user experience.

## What you get
```
.
├── README.md
├── classes
│   ├── PaymentProviderApi.php
│   └── index.php
├── controllers
│   ├── front
│   │   ├── index.php
│   │   ├── notification.php
│   │   └── redirect.php
│   └── index.php
├── index.php
├── mymodule.php
├── translations
│   └── index.php
├── upgrade
│   ├── index.php
│   └── upgrade-1.1.0.php
└── views
    ├── css
    │   ├── back.css
    │   ├── front.css
    │   └── index.php
    ├── index.php
    ├── js
    │   ├── back.js
    │   ├── front.js
    │   └── index.php
    └── templates
        ├── admin
        │   └── index.php
        ├── front
        │   ├── index.php
        │   └── redirect.tpl
        ├── hooks
        │   ├── index.php
        │   └── payment.tpl
        └── index.php
```

## Requirements

You just need `Node.js` and `NPM` installed on your machine


## Getting started

Install [Yeoman](http://yeoman.io/) if you don't have it already:
```
npm install -g yo
```

Install this generator:
```
npm install -g generator-prestashop-payment-module
```

Let the magic happen :tada: :
```
yo prestashop-payment-module
```

At this stage you'll be prompted for the following details:
* `Technical Name`: The module repository name. The generator will also create a PascalCase version of this string, and use it as the module main class
* `Display Name`: This is the name that the merchant will see in the PrestaShop backoffice. 
* `Author` and `Author Email`: Just put your name and your email
* `Description`: This text will be displayed in the PrestaShop backoffice, just under the `Display Name`. You can use buzzwords and marketing stuff here but keep it short ( <= 200 characters)
* `Select hooks`: This is a work in progress. Just type `Enter` because this input will be ignored for now. By default, the module is hooked on `displayBackofficeHeader`, `displayHeader`, `displayPayment`, and `displayPaymentReturn`.
* `Confirm Uninstall Message`: The message to display when the merchants uninstall the module from his store.
* `Payment provider name`: There are tons of payment service providers (or PSP) out there. Just put the name of the one you want to implement.

:warning: These inputs are piped through validation functions so if you're stuck on the prompt, that probably means that you're current proposition doesn't match the expected format. Feel free to open an issue if you find a bug.

Et voilà ! A brand new payment module is born at your current location, put in in the `modules` folder of a PrestaShop store, and install it via its backoffice.


## TODO
- [ ] 100% code coverage
- [ ] Hooks selection on the prompt - WIP
- [x] Instructions for the prompt
- [ ] Developer documentation
- [ ] Generic logo/images
- [ ] PHPDoc Compliancy
- [ ] PSR-2 Compliancy
