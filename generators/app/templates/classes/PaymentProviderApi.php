<?php
/**
 * <%= filename %>
 *
 * Main file of the module
 *
 * @author  <%= author %> <<%= authorEmail %>>
 * @version 1.0.0
 * @see     PaymentModuleCore
 */

/**
 * Payment Provider Class
 */
class <%= paymentProviderClass %>
{
    /**
     * Create an array of the transaction parameters required by the PSP
     *
     * @todo   fetch the parameters according to the payment provider API
     * @return array
     */
    public static function getParameters()
    {
        $module = Context::getContext()->controller->module;
        $cart = Context::getContext()->cart;
        $customer = Context::getContext()->customer;

        return (array());
    }

    /**
     * Get the payment URL
     *
     * @return string
     */
    public static function getPaymentUrl()
    {
        if (Configuration::get('<%= technicalNameUpperCase %>_LIVE_MODE') === true) {
            return ('https://live.psp.com');
        } else {
            return ('https://test.psp.com');
        }
    }
}
