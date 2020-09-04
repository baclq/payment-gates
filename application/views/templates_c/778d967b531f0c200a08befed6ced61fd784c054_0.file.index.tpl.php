<?php
/* Smarty version 3.1.30, created on 2020-09-01 12:27:41
  from "D:\xampp\htdocs\payment\application\views\templates\posts\index.tpl" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.30',
  'unifunc' => 'content_5f4e221d38b5a0_22985967',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '778d967b531f0c200a08befed6ced61fd784c054' => 
    array (
      0 => 'D:\\xampp\\htdocs\\payment\\application\\views\\templates\\posts\\index.tpl',
      1 => 1598956060,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:common/header.tpl' => 1,
    'file:common/footer.tpl' => 1,
  ),
),false)) {
function content_5f4e221d38b5a0_22985967 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_subTemplateRender("file:common/header.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>

<div class="container">
	<div class="row">
		<div class="col-12 col-md-12">
			<h3><?php echo $_smarty_tpl->tpl_vars['title']->value;?>
</h3>
			<table class="table table-striped">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">First</th>
						<th scope="col">Last</th>
						<th scope="col">Handle</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">1</th>
						<td>Mark</td>
						<td>Otto</td>
						<td>@mdo</td>
					</tr>
					<tr>
						<th scope="row">2</th>
						<td>Jacob</td>
						<td>Thornton</td>
						<td>@fat</td>
					</tr>
					<tr>
						<th scope="row">3</th>
						<td>Larry</td>
						<td>the Bird</td>
						<td>@twitter</td>
					</tr>
				</tbody>
			</table>


			<h3>Tổng số dòng: <?php echo $_smarty_tpl->tpl_vars['total_rows']->value;?>
</h3>

			<table class="table table-striped">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Tên</th>
						<th scope="col">Ngày tạo</th>
						<th scope="col">Lượt xem</th>
					</tr>
				</thead>
				<tbody>
				<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['results']->value, 'result');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['result']->value) {
?>
					<tr>
						<th scope="row">1</th>
						<td><?php echo $_smarty_tpl->tpl_vars['result']->value->ten_vi;?>
</td>
						<td><?php echo $_smarty_tpl->tpl_vars['result']->value->ngaytao;?>
</td>
						<td><?php echo $_smarty_tpl->tpl_vars['result']->value->luotxem;?>
</td>
					</tr>
				<?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
?>

				<tr>
					<td>
						<?php echo $_smarty_tpl->tpl_vars['links']->value;?>

					</td>
				</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>
<?php $_smarty_tpl->_subTemplateRender("file:common/footer.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>

<?php }
}
