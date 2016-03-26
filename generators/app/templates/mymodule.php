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
if (!defined('_PS_VERSION_')) {
    exit;
}
/**
 * Main class of the module
 */
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
        $this->need_instance = 1;
        $this->currencies = true;
        $this->currencies_mode = 'checkbox';
        $this->bootstrap = true;
        parent::__construct();

        $this->displayName = $this->l('<%= displayName %>');
        $this->description = $this->l('<%= description %>');
        $this->confirmUninstall = $this->l('<%= msgUninstall %>');
        $this->ps_versions_compliancy = array(
            'min' => '1.6',
            'max' => _PS_VERSION_
        );
        $this->need_instance = 1;

        // Only if you want to publish your module on the Addons Marketplace
        // $this->module_key = '';

        $this->hooks = array(
            'header',
            'backOfficeHeader',
            'payment',
            'paymentReturn'
        );
    }

    /**
     * Install the module on the store
     *
     * @see    Module::install()
     * @todo   bootstrap the configuration requirements of <%= paymentProviderClass %>
     * @throws PrestaShopException
     * @return bool
     */
    public function install()
    {
        // Don't forget to check for PHP extensions like curl here

        Configuration::updateValue('<%= technicalNameUpperCase %>_LIVE_MODE', false);

        if (parent::install() && $this->registerHook($this->hooks)) {
            return true;
        } else {
            $this->_errors[] = $this->l('There was an error during the installation. Please contact the developer of the module');
            return false;
        }
    }

    /**
     * Uninstall the module
     *
     * @see    Module::uninstall()
     * @todo   remove the configuration requirements of <%= paymentProviderClass %>
     * @throws PrestaShopException
     * @return bool
     */
    public function uninstall()
    {
        $form_values = $this->getConfigFormValues();
        foreach (array_keys($form_values) as $key) {
            Configuration::deleteByName($key);
        }

        return parent::uninstall();
    }

    /**
     * Entry point to the module configuration page
     *
     * @see Module::getContent()
     * @return string
     */
    public function getContent()
    {
        if (Tools::isSubmit('submit_<%= technicalName %>')) {
            $this->postProcess();
        }

        $this->context->smarty->assign(array('module_dir' => $this->_path));

        return $this->renderForm();
    }


    /**
     * Generate the configuration form HTML markup
     *
     * @return string
     */
    protected function renderForm()
    {
        $helper = new HelperForm();

        $helper->show_toolbar = false;
        $helper->table = $this->table;
        $helper->module = $this;
        $helper->default_form_language = $this->context->language->id;
        $helper->allow_employee_form_lang = Configuration::get('PS_BO_ALLOW_EMPLOYEE_FORM_LANG', 0);

        $helper->identifier = $this->identifier;
        $helper->submit_action = 'submit_<%= technicalName %>';
        $helper->currentIndex = $this->context->link->getAdminLink('AdminModules', false)
            .'&configure='.$this->name.'&tab_module='.$this->tab.'&module_name='.$this->name;
        $helper->token = Tools::getAdminTokenLite('AdminModules');

        $helper->tpl_vars = array(
            'fields_value' => $this->getConfigFormValues(), /* Add values for your inputs */
            'languages' => $this->context->controller->getLanguages(),
            'id_language' => $this->context->language->id,
        );

        return $helper->generateForm(array($this->getConfigForm()));
    }


    /**
     * Define the input of the configuration form
     *
     * @see $this->renderForm
     *
     * @return array
     */
    protected function getConfigForm()
    {
        return array(
            'form' => array(
                'legend' => array(
                'title' => $this->l('Settings'),
                'icon' => 'icon-cogs',
                ),
                'input' => array(
                    array(
                        'type' => 'switch',
                        'label' => $this->l('Live mode'),
                        'name' => '<%= technicalNameUpperCase %>_LIVE_MODE',
                        'is_bool' => true,
                        'desc' => $this->l('Choose between live or test mode'),
                        'values' => array(
                            array(
                                'id' => 'active_on',
                                'value' => 1,
                                'label' => $this->l('Live')
                            ),
                            array(
                                'id' => 'active_off',
                                'value' => 0,
                                'label' => $this->l('Test')
                            )
                        ),
                    )
                ),
                'submit' => array(
                    'title' => $this->l('Save'),
                ),
            ),
        );
    }


    /**
     * Retrieve the current configuration values.
     *
     * @see $this->renderForm
     *
     * @return array
     */
    protected function getConfigFormValues()
    {
        return array(
            '<%= technicalNameUpperCase %>_LIVE_MODE' => Configuration::get('<%= technicalNameUpperCase %>_LIVE_MODE', true)
        );
    }

    /**
     * Logic to apply when the configuration form is posted
     *
     * @return void
     */
    public function postProcess()
    {
        $form_values = $this->getConfigFormValues();

        foreach (array_keys($form_values) as $key) {
            Configuration::updateValue($key, Tools::getValue($key));
        }
    }

    /**
    * Add the CSS & JavaScript files in the module's backoffice.
    *
    * @return void
    */
    public function hookBackOfficeHeader()
    {
        if (Tools::getValue('module_name') == $this->name) {
            $this->context->controller->addJS($this->_path.'views/js/back.js');
            $this->context->controller->addCSS($this->_path.'views/css/back.css');
        }
    }


    /**
     * Add the CSS & JavaScript files on the frontoffice.
     *
     * @return void
     */
    public function hookHeader()
    {
        $this->context->controller->addJS($this->_path.'/views/js/front.js');
        $this->context->controller->addCSS($this->_path.'/views/css/front.css');
    }

    /**
     * Logic to execute when the hook 'displayPayment' is fired
     *
     * @return string
     */
    public function hookPayment()
    {
        $template = 'views/templates/hooks/payment.tpl';

        $this->context->smarty->assign(
            array(
                'payment_label' => $this->l('Pay with <%= technicalName %>'),
            )
        );

        return $this->display(__FILE__, $template);
    }

    /**
     * Logic to execute when the hook 'displayPaymentReturn' is fired
     *
     * @return string
     */
    public function hookPaymentReturn($params)
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
