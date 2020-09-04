
$(document).ready(function() {
   	$('.frm').submit(function(){
   		var full_name = $('.full_name').val();
   		var email = $('.email').val();
   		var phone = $('.phone').val();
   		var address = $('.address').val();
   		if(!full_name){
   			$('.alert-name').html('<div class="alert alert-danger">Vui lòng nhập họ & tên</div>');
   			return false;
   		}else{
   			$('.alert-name').html('');
   		}
   		if(!email){
   			$('.alert-email').html('<div class="alert alert-danger">Vui lòng nhập địa chỉ email!</div>');
   			return false;
   		}else{
   			$('.alert-email').html('');
   		}
   		if(!phone){
   			$('.alert-phone').html('<div class="alert alert-danger">Vui lòng nhập số điện thoại!</div>');
   			return false;
   		}else{
   			$('.alert-phone').html('');
   		}
   		if(!checkPhoneNumber(phone)){
   			$('.alert-phone').html('<div class="alert alert-danger">Số điện thoại không đúng định dạng!</div>');
   			return false;
   		}
   		if(!address){
   			$('.alert-address').html('<div class="alert alert-danger">Vui lòng nhập địa chỉ nhận hàng</div>');
   			return false;
   		}else{
   			$('.alert-address').html('');
   		}	    
  	});
});

function checkPhoneNumber(phone) {
    var flag = false;
    phone = phone.replace('(+84)', '0');
    phone = phone.replace('+84', '0');
    phone = phone.replace('0084', '0');
    phone = phone.replace(/ /g, '');
    if (phone != '') {
        var firstNumber = phone.substring(0, 2);
        if ((firstNumber == '09' || firstNumber == '08' || firstNumber == '07' || firstNumber == '05' || firstNumber == '03') && phone.length == 10) {
            if (phone.match(/^\d{10}/)) {
                flag = true;
            }
        } else if (firstNumber == '01' && phone.length == 11) {
            if (phone.match(/^\d{11}/)) {
                flag = true;
            }
        }
    }
    return flag;
}

function isPhone(phone){
    var re = /^(01[2689]|09|08)[0-9]{8}$/;
    return re.test(phone);
}
function check_email(email){
   var email = email.toLowerCase();
	emailRegExp = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.([a-z]){2,4})$/;
	return emailRegExp.test(email);
}