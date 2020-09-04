<?php
/* Smarty version 3.1.30, created on 2020-09-03 12:40:32
  from "D:\xampp\htdocs\payment-demo\application\views\templates\payments\choose_payment.tpl" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.30',
  'unifunc' => 'content_5f50c82064e064_18104585',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '2a815146002df743694e5698783bf5530f9b12a2' => 
    array (
      0 => 'D:\\xampp\\htdocs\\payment-demo\\application\\views\\templates\\payments\\choose_payment.tpl',
      1 => 1599129631,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:common/header.tpl' => 1,
    'file:common/footer.tpl' => 1,
  ),
),false)) {
function content_5f50c82064e064_18104585 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_subTemplateRender("file:common/header.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>

<div class="container">
	<div class="row">
		<div class="col-12 col-md-12">
			<h3 class="text-center bold">Chọn phương thức thanh toán</h3>
			<div class="m-2">
				<i class="fa fa-credit-card" aria-hidden="true"></i>
				<a href="/payment-demo/payment/paymentCod">Thanh toán COD</a>
			</div>
			<div class="m-2">
				<i class="fa fa-credit-card" aria-hidden="true"></i>
				<a href="/payment-demo/payment/paymentVNPay">Thanh toán VNPAY</a>
			</div>
			<div class="m-2">
				<i class="fa fa-credit-card" aria-hidden="true"></i>
				<a href="/payment-demo/payment/paymentZaloPay">Thanh toán ZALOPAY</a>
			</div>
			<div class="m-2">
				<i class="fa fa-credit-card" aria-hidden="true"></i>
				<a href="/payment-demo/payment/paymentMomo">Thanh toán MOMO</a>
			</div>
			<div class="m-2">
				<i class="fa fa-credit-card" aria-hidden="true"></i>
				<a href="/payment-demo/payment/paymentNganluong">Thanh toán Ngân lượng</a>
			</div>
		</div>
	</div>
</div>
<?php $_smarty_tpl->_subTemplateRender("file:common/footer.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>

<?php }
}
