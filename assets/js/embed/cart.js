$(document).ready(function () { 
	$('.prd-show-list').bind('change', function() {
		var discount = $('.discount-price').val();
		var arr_id = $(this).val();
	    if(arr_id.length > 0){
	    	$.ajax({
		        type: "POST",
		        url: "/embed/cart",
		        data: {'id' : arr_id, 'discount' : Number(discount)},
		        cache: false,
		        success: function (result) {
		        	var obj = JSON.parse(result);
		        	$('.cart-list').html(obj.html);
		        	$('.total-pay').removeClass('hidden');
		        	$('.total-payment').html(obj.total_pay);
		        }
		    });
	    }else{
	    	$.ajax({
		        type: "POST",
		        url: "/embed/destroy",
		        data: {'id' : arr_id},
		        cache: false,
		        success: function (result) {
		        	var obj = JSON.parse(result);
		        	$('.cart-list').html(obj.html);
		        	$('.total-pay').addClass('hidden');
		        }
		    });
	    }
	    
	});
	$(document).on("click", ".prd-list", function(e) { 		
		var discount = $('.discount-price').val();
		var id = $(this).attr('data-tokens');
	    if(arr_id.length > 0){
	    	$.ajax({
		        type: "POST",
		        url: "/embed/cart",
		        data: {'id' : arr_id, 'discount' : Number(discount)},
		        cache: false,
		        success: function (result) {
		        	var obj = JSON.parse(result);
		        	$('.cart-list').html(obj.html);
		        	$('.total-pay').removeClass('hidden');
		        	$('.total-payment').html(obj.total_pay);
		        }
		    });

	    }else{
	    	$.ajax({
		        type: "POST",
		        url: "/embed/destroy",
		        data: {'id' : arr_id},
		        cache: false,
		        success: function (result) {
		        	var obj = JSON.parse(result);
		        	$('.cart-list').html(obj.html);
		        	$('.total-pay').addClass('hidden');
		        }
		    });
	    }
	    
	});
	/*$('.selectpicker').on('changed.bs.select', function (e) {
	    var id = e.target.value;
	    console.log(e);
	    console.log(id);
	    var discount = $('.discount-price').val();
	    if(id){
	    	$.ajax({
		        type: "POST",
		        url: "/embed/add",
		        data: {'id' : id, 'discount' : Number(discount)},
		        cache: false,
		        success: function (result) {
		        	var obj = JSON.parse(result);
		        	$('.cart-list').html(obj.html);
		        	$('.total-pay').removeClass('hidden');
		        	$('.total-payment').html(obj.total_pay);
		        }
		    });
	    }
	});*/
});	


$(document).on("click", ".remove-cart", function(e) { 
	var id = $(this).attr('id');
	var discount = $('.discount-price').val();
	$.ajax({
        type: "POST",
        url: "/embed/remove",
        data: {'id' : id, 'discount' : discount},
        cache: false,
        success: function (result) {
        	var obj = JSON.parse(result);
        	$('.cart-list').html(obj.html);
        	$('.dropdown-menu li a[data-tokens=' + id + ']').parent().removeClass('selected');
        	$('#prd-show-list').selectpicker('val', obj.arr_id);
        	$('.total-payment').html(obj.total_pay);
        }
    });
});

$(document).on('change', '.quality', function() {
	var id = $(this).attr('data-id');
	var q = $(this).val();
	var price = $('#price_sale_new_'+id).val();
	var el = $(this);
	var discount = $('.discount-price').val();
	$.ajax({
        type: "POST",
        url: "/embed/update",
        data: {'id' : id, 'q' : q, 'discount' : discount, 'price' : price},
        cache: false,
        success: function (result) {
        	var obj = JSON.parse(result);
        	el.closest('.items-cart').find('.price-cart').html(obj.subtotal);
        	$('.total-price').html(obj.total);
        	$('.total-payment').html(obj.total_pay);
        }
    });
});

$(document).on('keyup', '.price_sale_new', function() {
	var id = $(this).attr('data-id');
	var q = $('#quality_'+id).val();
	var price = $(this).val();
	var el = $(this);
	var discount = $('.discount-price').val();
	$.ajax({
        type: "POST",
        url: "/embed/update",
        data: {'id' : id, 'q' : q, 'discount' : discount, 'price' : price},
        cache: false,
        success: function (result) {
        	var obj = JSON.parse(result);
        	el.closest('.items-cart').find('.price-cart').html(obj.subtotal);
        	$('.total-price').html(obj.total);
        	$('.total-payment').html(obj.total_pay);
        }
    });
});

$(document).on('keydown', '.price_sale_new', function() {
	var id = $(this).attr('data-id');
	var q = $('#quality_'+id).val();
	var price = $(this).val();
	var el = $(this);
	var discount = $('.discount-price').val();
	$.ajax({
        type: "POST",
        url: "/embed/update",
        data: {'id' : id, 'q' : q, 'discount' : discount, 'price' : price},
        cache: false,
        success: function (result) {
        	var obj = JSON.parse(result);
        	el.closest('.items-cart').find('.price-cart').html(obj.subtotal);
        	$('.total-price').html(obj.total);
        	$('.total-payment').html(obj.total_pay);
        }
    });
});

$(document).on('change', '.price_sale_new', function() {
    var id = $(this).attr('data-id');
	var q = $('#quality_'+id).val();
	var price = $(this).val();
	var el = $(this);
	var discount = $('.discount-price').val();
	$.ajax({
        type: "POST",
        url: "/embed/update",
        data: {'id' : id, 'q' : q, 'discount' : discount, 'price' : price},
        cache: false,
        success: function (result) {
        	var obj = JSON.parse(result);
        	el.closest('.items-cart').find('.price-cart').html(obj.subtotal);
        	$('.total-price').html(obj.total);
        	$('.total-payment').html(obj.total_pay);
        }
    });
});

$(document).ready(function(){
    $('.discount-price').keydown(function(){
    	var discount = $('.discount-price').val();
    	var ship_fee = $('.ship-fee').val();
        $.ajax({
	        type: "POST",
	        url: "/embed/discount",
	        data: {'discount' : discount, 'ship_fee' : ship_fee},
	        cache: false,
	        success: function (result) {
	        	var obj = JSON.parse(result);
	        	if(obj.status == 200){
	        		$('.total-payment').html(obj.total_pay);
	        		$('.error-discount').html('');
	        	}else{
	        		$('.error-discount').html('<div class="alert alert-warning mt-5">'+obj.msg+'!</div>');
	        		return false
	        	}	        	
	        }
	    });
    });
    $('.discount-price').keyup(function(){
    	var discount = $('.discount-price').val();
    	var ship_fee = $('.ship-fee').val();
        $.ajax({
	        type: "POST",
	        url: "/embed/discount",
	        data: {'discount' : discount, 'ship_fee' : ship_fee},
	        cache: false,
	        success: function (result) {
	        	var obj = JSON.parse(result);
	        	if(obj.status == 200){
	        		$('.total-payment').html(obj.total_pay);
	        		$('.error-discount').html('');
	        	}else{
	        		$('.error-discount').html('<div class="alert alert-danger mt-5">'+obj.msg+'!</div>');
	        		return false
	        	}
	        }
	    });
    });
});

$(document).ready(function(){
    $('.ship-fee').keydown(function(){
    	var discount = $('.discount-price').val();
    	var ship_fee = $('.ship-fee').val();
        $.ajax({
	        type: "POST",
	        url: "/embed/ship_fee",
	        data: {'discount' : discount, 'ship_fee' : ship_fee},
	        cache: false,
	        success: function (result) {
	        	var obj = JSON.parse(result);
	        	if(obj.status == 200){
	        		$('.total-payment').html(obj.total_pay);
	        		$('.error-ship-fee').html('');
	        	}else{
	        		$('.error-ship-fee').html('<div class="alert alert-warning mt-5">'+obj.msg+'!</div>');
	        		return false
	        	}	        	
	        }
	    });
    });
    $('.ship-fee').keyup(function(){
    	var discount = $('.discount-price').val();
    	var ship_fee = $('.ship-fee').val();
        $.ajax({
	        type: "POST",
	        url: "/embed/ship_fee",
	        data: {'discount' : discount, 'ship_fee' : ship_fee},
	        cache: false,
	        success: function (result) {
	        	var obj = JSON.parse(result);
	        	if(obj.status == 200){
	        		$('.total-payment').html(obj.total_pay);
	        		$('.error-ship-fee').html('');
	        	}else{
	        		$('.error-ship-fee').html('<div class="alert alert-danger mt-5">'+obj.msg+'!</div>');
	        		return false
	        	}
	        }
	    });
    });
});

$(document).on("click", ".save-orders", function(e) {	
	var discount = $('.discount-price').val();
	var name = $('.cus_name').val();
	if(!name){
		$('.cart_name_error').html('<div class="alert alert-danger mt-5">Vui lòng nhập họ tên khách hàng!</div>');
		$('.cus_name').focus();
		return false;
	}else{
		$('.cart_name_error').html('');
	}
	var email = $('.cus_email').val();
	/*if(!email){
		$('.cart_email_error').html('<div class="alert alert-danger mt-5">Vui lòng nhập email!</div>');
		$('.cus_email').focus();
		return false;
	}else{
		$('.cart_email_error').html('');
	}*/
	var mobile = $('.cus_mobile').val();
	if(!mobile){
		$('.cart_mobile_error').html('<div class="alert alert-danger mt-5">Vui lòng nhập số điện thoại!</div>');
		$('.cus_mobile').focus();
		return false;
	}else{
		$('.cart_mobile_error').html('');
	}
	if(!checkPhoneNumber(mobile)){
		$('.cart_mobile_error').html('<div class="alert alert-danger mt-5">Số điện thoại không đúng định dạng!</div>');
		$('.cus_mobile').focus();
		return false;
	}else{
		$('.cart_mobile_error').html('');
	}
	var adress = $('.cus_address').val();
	var cart_note = $('.cart_note').val();
	var shop_id = $('.shop_id').val();
	var aff_id = $('.aff_id').val();
	var utm_source = $('.utm_source').val();
	var ship_fee = $('.ship-fee').val();
	var ship_fee = $('.ship-fee').val();
	var contact_id = $('#contact_id').val();
	var page_id = $('#page_id').val();
	var fchat_id = $('#fchat_id').val();
	console.log(page_id);
	$.ajax({
        type: "POST",
        url: "/embed/save",
        data: {'discount' : discount, 'name' : name, 'email' : email, 'mobile' : mobile, 'adress' : adress, 'cart_note' : cart_note, 'shop_id' : shop_id, 'aff_id' : aff_id, 'utm_source' : utm_source, 'extra_price' : ship_fee, 'contact_id' : contact_id, 'page_id' : page_id, 'fchat_id' : fchat_id},
        cache: false,
        success: function (result) {
        	var obj = JSON.parse(result);
        	if(obj.status == 200){
        		$('#modal-products').modal('hide');
        		$('.order-code-rs').html(obj.order_code);
        		$('#modal-result').modal('show');
        	}else{
        		$('.mgs-rs').html('<div class="alert alert-danger mt-5">'+obj.msg+'</div>');
        	}
        }
    });

    $('#modal-result').on('hidden.bs.modal', function (e) {
    	$('.selectpicker').selectpicker('deselectAll');
    	$('#modal-result').modal('hide');
    	$('.cnt-order').removeClass('hidden');
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
        if ((firstNumber == '09' || firstNumber == '08' || firstNumber == '07' || firstNumber == '05'  || firstNumber == '03') && phone.length == 10) {
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

$(document).on("change", "#province_ajax", function() {
	var id = $(this).val();
	$.ajax({
		type: "POST",
		url: '/globalaction/get_district/'+ id,
		data: "ajax",
		async: true,
		success: function(data){
			$("#district_ajax").html(data);
		}
	})
});

$(document).on("click", ".count-ship-fee", function(e) {
	var province_id = $('.province_id').val();
	if(!province_id){
		$('.cart_province_error').html('<div class="alert alert-danger mt-5">Vui lòng chọn tỉnh/thành phố!</div>');
		$('.province_id').focus();
		return false;
	}else{
		$('.cart_province_error').html('');
	}
	var district_id = $('.district_id').val();
	if(!district_id){
		$('.cart_district_error').html('<div class="alert alert-danger mt-5">Vui lòng chọn quận/huyện!</div>');
		$('.district_id').focus();
		return false;
	}else{
		$('.cart_district_error').html('');
	}
	var address = $('.cust_address').val();
	var shop_id = $('.shop_id').val();	
	var discount = $('.discount-price').val();
    $.ajax({
        type: "POST",
        url: '/embed/countshipping',
        data: {province_id:province_id, district_id:district_id, address:address, shop_id:shop_id, discount:discount},
        async: true,
        success: function(data){
            var obj = JSON.parse(data);
            $('.ship-fee').val(obj.ship_fee);
            $('.total-payment').html(obj.orderTotal_show);
        }
    });
});

$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip(); 
});