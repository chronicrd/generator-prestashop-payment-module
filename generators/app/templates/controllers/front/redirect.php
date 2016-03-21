<?php
/*
 * This front controller builds the payment request and then redirects the
 * customer to the PSP website so that he can pay safely
 */
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

        /**
         * TODO : Here you have to build all the parameters required by the PSP
         */
        $this->context->smarty->assign(
            array(
                'paymenturl' => <%= paymentProviderClass %>::getPaymentUrl(),
            )
        );
        return $this->setTemplate('redirect.tpl');
    }
}
