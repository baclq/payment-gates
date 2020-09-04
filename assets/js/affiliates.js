$(document).ready(function(){
	$('#affiliate_submit').click(function(e) {
		var affiliate_user_name = $('#affiliate_user_name').val();
        if(affiliate_user_name == '')
        {
            $("#affiliate_user_name").focus();
            showMsg("Bạn chưa nhập Username, vui lòng kiểm tra lại!");
            return false;
        }
        else{
            $("#message_show").html('');
        }
        if(affiliate_user_name != '') {
            var user_check_return = jQuery.parseJSON(JSON.stringify(
                jQuery.ajax({
                    url: BASE_URL + "globalaction/check_username?user_id=" + user_id + "&user_name=" + affiliate_user_name,
                    async: false,
                    dataType: 'json'
                }).responseText
            ));
            var data_return = JSON.parse(user_check_return);
            if(data_return.error)
            {
                $("#affiliate_user_name").focus();
                showMsg(data_return.msg);
                return false;
            }
        }
	});
});