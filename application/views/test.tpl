<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>{$title}</title>
</head>
<body>
	<h1>{$title}</h1>
	<p>{$message}</p>
	<p class="footer">
		Page rendered in: <strong>{literal}{elapsed_time}{/literal}</strong> seconds.<br>
		Memory usage:  <strong>{literal}{memory_usage}{/literal}</strong>.<br>
		PHP version: <strong>{$php_version}</strong>.<br>
		CodeIgniter version: <strong>{CI_VERSION}</strong>.
	</p>
</body>
</html>
