$(document).ready(function(){
	$('#role_submit').click(function(e) {
		var role_module = $('#role_module').val();
		var role_name = $('#role_name').val();
		if(role_module == '')
		{
			$("#role_module").focus();
			showMsg("Vui lòng chọn Module, vui lòng thử lại!");
			return false;
		}
		else{
			$("#message_show").html('');
		}
		if(role_name == '')
		{
			$("#role_name").focus();
			showMsg("Vui lòng nhập tên quyền, vui lòng thử lại!");
			return false;
		}
		else{
			$("#message_show").html('');
		}
	});
});