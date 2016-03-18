<?php
class <%= className %> extends PaymentModule
{
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->name = '<%= technicalName %>';
        $this->tab = 'payments_gateway';
        $this->version = '1.0.0';
        $this->author = '<%= author %>';
        $this->currencies = true;
        $this->currencies_mode = 'checkbox';
        $this->bootstrap = true;
        parent::__construct();

        $this->displayName = $this->l('<%= displayName %>');
        $this->description = $this->l('<%= description %>');
        $this->ps_versions_compliancy = array(
            'min' => '1.6',
            'max' => _PS_VERSION_
        );
        $this->need_instance = 1;

        // Only if you want to publish your module on the Addons Marketplace
        // $this->module_key = '';

        // List of configuration values in DB
        $this->config_values = array(
        );

        $this->hooks = array(
            'payment',
            'orderconfirmation'
        );
    }

    /**
     * Install the module
     *
     * @return bool
     */
    public function install()
    {
        // Do whatever is needed when installing the module
        // eg. set default config values, check for PHP extensions etc.

        if (parent::install() && $this->registerHook($this->hooks)) {
            return true;
        } else {
            $this->_errors[] = $this->l(
                'There was an error during the installation.
                Please contact the developer of the module'
            );
            return false;
        }
    }

    /**
     * Uninstall the module
     *
     * @return bool
     */
    public function uninstall()
    {
        // Do whatever is needed when uninstalling the module
        // eg. uninstall tabs or DB records

        $this->deleteConfigurationByNames($this->config_values);

        if (parent::uninstall() && $this->unregisterHook($this->hooks)) {
            return (true);
        } else {
            $this->_errors[] = $this->l(
                'There was an error during the uninstall process.
                Please contact the developer of the module'
            );
            return false;
        }
    }

    /**
     * Deletes an array of configuration values
     *
     * @param array $names the configuration keys
     *
     * @return bool
     */
    public function deleteConfigurationByNames(array $names)
    {
        $flag = true;
        foreach ($names as $name) {
            if (Configuration::deleteByName($name)) {
                $flag = false;
            }
        }

        return ($flag);
    }

    /**
     * Load external scripts
     *
     * @return void
     */
    public function loadAssets()
    {
        $this->context->controller->addJS($this->_path . 'views/js/back.js');
        $this->context->controller->addCSS($this->_path . 'views/css/back.css');
    }

    /**
     * Entry point to the module configuration page
     */
    public function getContent()
    {
        $this->loadAssets();

        if (Tools::isSubmit('configSubmit')) {
            $this->postProcess();
        }

        $this->context->smarty->assign(
            array(
                'module_dir'     => $this->_path,
                'module_version' => $this->version,
            )
        );

        //return $this->display('__FILE__', 'getcontent.tpl');
    }

    /**
     * Process inputs from the module backoffice
     */
    public function postProcess()
    {
        $data = $this->getAllValues();
        // Do whatever is needed to configure the module
    }

    /**
     *  Put POST and GET variables into a single array
     */
    public function getAllValues()
    {
        return $_POST + $_GET;
    }

    public function hookDisplayPayment()
    {
        $template = 'views/templates/hooks/payment.tpl';

        $this->context->smarty->assign(
            array(
                'payment_label' => 'Pay with <%= technicalName %>',
            )
        );

        return $this->display(__FILE__, $template);
    }

    public function hookDisplayOrderConfirmation($params)
    {
        if ($this->active == false) {
            return;
        }

        $order = $params['objOrder'];
        if ($order->getCurrentOrderState()->id != Configuration::get('PS_OS_ERROR')) {
            // The order doesn't have an error status
            $this->context->smarty->assign('status', 'ok');
        }

        $template = 'views/templates/hook/orderconfirmation.tpl';
        return $this->display(__FILE__, $template);
    }
}
