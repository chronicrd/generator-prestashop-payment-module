<?php
class <%= paymentProviderClass %>
{
    public static function getParameters()
    {
        $module = Context::getContext()->controller->module;
        $cart = Context::getContext()->cart;
        $customer = Context::getContext()->customer;
        // Here you can create the transaction parameters
        // according to the payment provider API

        return (array());
    }

    public static function getPaymentUrl()
    {
        // Here you can set the URL where the payment form will be posted
        return ('https://test.url.com');
    }
}
