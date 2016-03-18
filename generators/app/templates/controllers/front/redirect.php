<?php

class <%= className %>RedirectModuleFrontController extends ModuleFrontController
{
    public $ssl = true;

    public function initContent()
    {
        $this->display_column_left = false;
        $this->display_column_right = false;
        parent::initContent();
    }

    public function postProcess()
    {
        require(dirname(__FILE__) . '/../../classes/<%= paymentProviderClass %>.php');
        // Do whatever you have to do before redirecting the customer
        // on the website of your payment processor

        $this->context->smarty->assign(
            array(
                'url' => <%= paymentProviderClass %>::getPaymentUrl(),
            )
        );
        return $this->setTemplate('redirect.tpl');
    }
}
