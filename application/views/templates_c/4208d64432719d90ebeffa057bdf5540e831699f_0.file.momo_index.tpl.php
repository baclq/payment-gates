<?php
/* Smarty version 3.1.30, created on 2020-09-03 12:30:05
  from "D:\xampp\htdocs\payment-demo\application\views\templates\payments\momo_index.tpl" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.30',
  'unifunc' => 'content_5f50c5ad3463b8_03797724',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '4208d64432719d90ebeffa057bdf5540e831699f' => 
    array (
      0 => 'D:\\xampp\\htdocs\\payment-demo\\application\\views\\templates\\payments\\momo_index.tpl',
      1 => 1599126452,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:common/header.tpl' => 1,
    'file:common/footer.tpl' => 1,
  ),
),false)) {
function content_5f50c5ad3463b8_03797724 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_subTemplateRender("file:common/header.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>

<div class="container">
	<div class="header clearfix">
		<h3 class="text-muted">VNPAY DEMO</h3>
	</div>
	<h3>Tạo mới đơn hàng</h3>

	<div class="table-responsive">
		<form action="vnpay_create_payment.php" id="create_form" method="post">

			<div class="form-group">
				<label for="language">Loại hàng hóa </label>
				<select name="order_type" id="order_type" class="form-control">
					<option value="topup">Nạp tiền điện thoại</option>
					<option value="billpayment">Thanh toán hóa đơn</option>
					<option value="fashion">Thời trang</option>
					<option value="other">Khác - Xem thêm tại VNPAY</option>
				</select>
			</div>
			<div class="form-group">
				<label for="order_id">Mã hóa đơn</label>
				<input class="form-control" id="order_id" name="order_id" type="text" value="<?php echo $_smarty_tpl->tpl_vars['order_info']->value['id'];?>
"/>
			</div>
			<div class="form-group">
				<label for="amount">Số tiền</label>
				<input class="form-control" id="amount"
					   name="amount" type="number" value="<?php echo $_smarty_tpl->tpl_vars['order_info']->value['total'];?>
"/>
			</div>
			<div class="form-group">
				<label for="order_desc">Nội dung thanh toán</label>
				<textarea class="form-control" cols="20" id="order_desc" name="order_desc" rows="2">Noi dung thanh toan</textarea>
			</div>
			<div class="form-group">
				<label for="bank_code">Ngân hàng</label>
				<select name="bank_code" id="bank_code" class="form-control">
					<option value="">Không chọn</option>
					<option value="NCB"> Ngan hang NCB</option>
					<option value="AGRIBANK"> Ngan hang Agribank</option>
					<option value="SCB"> Ngan hang SCB</option>
					<option value="SACOMBANK">Ngan hang SacomBank</option>
					<option value="EXIMBANK"> Ngan hang EximBank</option>
					<option value="MSBANK"> Ngan hang MSBANK</option>
					<option value="NAMABANK"> Ngan hang NamABank</option>
					<option value="VNMART"> Vi dien tu VnMart</option>
					<option value="VIETINBANK">Ngan hang Vietinbank</option>
					<option value="VIETCOMBANK"> Ngan hang VCB</option>
					<option value="HDBANK">Ngan hang HDBank</option>
					<option value="DONGABANK"> Ngan hang Dong A</option>
					<option value="TPBANK"> Ngân hàng TPBank</option>
					<option value="OJB"> Ngân hàng OceanBank</option>
					<option value="BIDV"> Ngân hàng BIDV</option>
					<option value="TECHCOMBANK"> Ngân hàng Techcombank</option>
					<option value="VPBANK"> Ngan hang VPBank</option>
					<option value="MBBANK"> Ngan hang MBBank</option>
					<option value="ACB"> Ngan hang ACB</option>
					<option value="OCB"> Ngan hang OCB</option>
					<option value="IVB"> Ngan hang IVB</option>
					<option value="VISA"> Thanh toan qua VISA/MASTER</option>
				</select>
			</div>
			<div class="form-group">
				<label for="language">Ngôn ngữ</label>
				<select name="language" id="language" class="form-control">
					<option value="vn">Tiếng Việt</option>
					<option value="en">English</option>
				</select>
			</div>

			<button type="submit" class="btn btn-primary" id="btnPopup">Thanh toán Popup</button>
			<button type="submit" class="btn btn-default">Thanh toán Redirect</button>
			<a href="/payment-demo/payment/choosePayment" class="btn btn-danger">Quay lại</a>
		</form>
	</div>
	<p>
		&nbsp;
	</p>
	<footer>
		<p class="text-center">&copy; VNPAY 2020</p>
	</footer>
</div>
<?php $_smarty_tpl->_subTemplateRender("file:common/footer.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>

<?php }
}
