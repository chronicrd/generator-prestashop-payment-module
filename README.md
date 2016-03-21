#generator-prestashop-payment-module
[![Coverage Status](https://coveralls.io/repos/github/marcpicaud/generator-prestashop-payment-module/badge.svg?branch=master)](https://coveralls.io/github/marcpicaud/generator-prestashop-payment-module?branch=master) [![Build Status](https://travis-ci.org/marcpicaud/generator-prestashop-payment-module.svg?branch=master)](https://travis-ci.org/marcpicaud/generator-prestashop-payment-module)
> Yeoman generator for PrestaShop - lets you quickly set up a payment module

Payment modules for PrestaShop almost always share the same architecture and it's painful to write them from scratch for each new payment provider.

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

## TODO
[] Better tests
[] Hooks checkboxes the prompt - wip
[] Publish package on npm
[] Instructions for people who aren't familiar with PrestaShop
[] Images ?
[] Automatically generate config helpers ?
[] PHPDoc Compliancy
[] PSR-2 Compliancy
