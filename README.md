#generator-prestashop-payment-module
[![Build Status](https://travis-ci.org/marcpicaud/generator-prestashop-payment-module.svg?branch=master)](https://travis-ci.org/marcpicaud/generator-prestashop-payment-module)[![npm version](https://badge.fury.io/js/generator-prestashop-payment-module.svg)](https://badge.fury.io/js/generator-prestashop-payment-module)
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

Then you'll be prompted for the module details. Please note that the generator will create the module repository at your current location so you may want to `cd path/to/store/modules` before running it.

## TODO
- [ ] Better tests
- [ ] Hooks checkboxes the prompt - wip
- [ ] Instructions for people who aren't familiar with PrestaShop
- [ ] Images ?
- [ ] Automatically generate config helpers ?
- [ ] PHPDoc Compliancy
- [ ] PSR-2 Compliancy
