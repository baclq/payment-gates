<?php
/* Smarty version 3.1.30, created on 2020-09-01 09:37:55
  from "D:\xampp\htdocs\codeigniter-3.1.10\application\views\templates\test.tpl" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.30',
  'unifunc' => 'content_5f4dfa53da0908_08677624',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '3e6a8abc98904316ef2a836e0c5de9233d018820' => 
    array (
      0 => 'D:\\xampp\\htdocs\\codeigniter-3.1.10\\application\\views\\templates\\test.tpl',
      1 => 1598936489,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5f4dfa53da0908_08677624 (Smarty_Internal_Template $_smarty_tpl) {
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title><?php echo $_smarty_tpl->tpl_vars['title']->value;?>
</title>
</head>
<body>
	<h1><?php echo $_smarty_tpl->tpl_vars['title']->value;?>
</h1>
	<p><?php echo $_smarty_tpl->tpl_vars['message']->value;?>
</p>
	<p class="footer">
		Page rendered in: <strong>{elapsed_time}</strong> seconds.<br>
		Memory usage:  <strong>{memory_usage}</strong>.<br>
		PHP version: <strong><?php echo $_smarty_tpl->tpl_vars['php_version']->value;?>
</strong>.<br>
		CodeIgniter version: <strong><?php echo CI_VERSION;?>
</strong>.
	</p>
</body>
</html>
<?php }
}
