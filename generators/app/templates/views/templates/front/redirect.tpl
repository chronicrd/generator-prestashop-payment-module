<div>
  <h3>{l s='You will be redirected to the payment platform in a few seconds...' mod='<%= technicalName %>'}</h3>
  <p>
    <a href="javascript:void(0)" onclick="document.getElementById('<%= technicalName %>_payment_form').submit();">
      {l s='Please click here if you are not automatically redirected.' mod='<%= technicalName %>'}
    </a>
    <form action="{$paymenturl|escape:'htmlall':'UTF-8'}" id="<%= technicalName %>_payment_form" method="post">
      <!-- TODO : Here goes the form inputs for making your payment request -->
    </form>
  </p>
  <script type="text/javascript">
    {literal}
      window.onload = function() {
        document.getElementById('<%= technicalName %>_payment_form').submit();
      }
    {/literal}
  </script>
</div>
