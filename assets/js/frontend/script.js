function isValidEmailAddress(emailAddress) {
	var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
	return pattern.test(emailAddress);
}
$(document).ready(function(){
	$("#contact_form_btn").on("click", function() {
		var contact_full_name = $("#contact_full_name").val();
		var contact_email = $("#contact_email").val();
		var contact_phone = $("#contact_phone").val();
		var contact_note = $("#contact_note").val();
		if(contact_full_name == ''){
			$("#contact_full_name").focus();
			return false;
		}
		if(contact_email =='' || !isValidEmailAddress(contact_email)){
			$("#contact_email").focus();
			return false;
		}
		if(contact_phone == ''){
			$("#contact_phone").focus();
			return false;
		}
		if(contact_note == ''){
			$("#contact_note").focus();
			return false;
		}
		$.ajax({
			type: "POST",
			url: BASE_URL + 'globalaction/sendmail?c=' + contact_full_name + '&e=' + contact_email + '&p=' + contact_phone + '&n=' + contact_note,
			data: "ajax",
			async: true,
			success: function(response){
				if(response){
					alert("Cảm ơn bạn đã gửi liên hệ, chúng tôi sẽ phản hồi lại trong thời gian sớm nhất!");
					$("#contact_full_name").val('');
					$("#contact_email").val('');
					$("#contact_phone").val('');
					$("#contact_note").val('');
				}
			}
		});

	});
});