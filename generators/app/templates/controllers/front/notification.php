<?php
/**
 * This class receives a POST request from the PSP and creates the PrestaShop
 * order according to the request parameters
 **/
class <%= className %>NotificationModuleFrontController extends ModuleFrontController
{
    /*
     * TODO : You probably have to register the following notification URL on
     * the PSP side :
     * http://yourstore.com/index.php?fc=module&module=<%= technicalName %>&controller=notification
     *
     * Handles the POST
     * @return bool
     */
    public function postProcess()
    {
        // We don't do anything if the module has been disabled by the merchant
        if ($this->module->active == false) {
            die;
        }

        /**
         * TODO : This is an example. You may need to fetch these values
         * otherwise
         */
        $cart_id = Tools::getValue('cart_id');
        $customer_id = Tools::getValue('customer_id');
        $amount = Tools::getValue('Amount');

        //Restore the context to process the order validation properly
        $context = Context::getContext();
        $context->cart = new Cart((int)$cart_id);
        $context->customer = new Customer((int)$customer_id);
        $context->currency = new Currency((int)$context->cart->id_currency);
        $context->language = new Language((int)$context->customer->id_lang);

        $secure_key = $context->customer->secure_key;
        $module_name = $this->module->displayName;
        $currency_id = (int)$context->currency->id;

        if ($this->isValidOrder() === true) {
            $payment_status = Configuration::get('PS_OS_PAYMENT');
            $message = null;
        } else {
            $payment_status = Configuration::get('PS_OS_ERROR');

            // Add a message to explain why the order has not been validated
            $message = $this->getErrorMessage();
        }

        return $this->module->validateOrder(
            $cart_id,
            $payment_status,
            $amount,
            $module_name,
            $message,
            array(),
            $currency_id,
            false,
            $secure_key
        );
    }

    protected function isValidOrder()
    {
        /**
         * TODO : Here you need to parse the data sent from the PSP to find out
         * if the transaction has been approved or not
         */

        return true;
    }

    protected function getErrorMessage()
    {
        /**
         * TODO : Here your need to build the right error message according to
         * the PSP response parameters
         */

        return $this->module->l('An error occurred while processing payment');
    }
}
