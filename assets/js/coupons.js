$(document).ready(function(){
	tinymce.init({ selector:'textarea#share_note', menubar: false, statusbar: false });
	$("#shop_chosen_ajax").change(function(){
		var id = $(this).val();
		$.ajax({
			type: "POST",
			url: BASE_URL + 'product/getProductByShopCoupon/'+ id,
			data: "ajax",
			async: true,
			success: function(data){
				$("#product_shop_ajax").html(data);
				$(".product-chosen").chosen();
				$('.product-chosen').trigger('chosen:updated');
			}
		})
	});
	$('.scope-chosen').change(function(){
		var id = $(this).val();
		if(id==2){
			$('.expand-coupon').removeClass('hide');
			$('.chosen-container').css({"width": "100%"});
		}else{
			$('.expand-coupon').addClass('hide');
		}
		$(".chosen-select").chosen();
		$('.chosen-select').trigger('chosen:updated');
	});
	$('#type').change(function(){
		var id = $(this).val();
		if(id==2){
			$('.none-flashsale').addClass('hide');
		}else{
			$('.none-flashsale').removeClass('hide');
		}
	});
	$('body').on("click", ".product-show", function() {
		var id = $('#shop_chosen_ajax').val();
		$.ajax({
			type: "POST",
			url: BASE_URL + 'product/product_show/'+ id,
			data: "ajax",
			async: true,
			success: function(data){
				$(".fill-table").html(data);
				$('#product_list_show').modal('show');
				var table = $('.dynamic-table').DataTable({"pageLength": 20});
			}
		});
	});
	$('body').on("click", ".add-product-coupon", function() {
		var id = $(this).attr('rel');
		var name = $(this).attr('name');
		var status = $(this).attr('status');
		var count = 0;
		var html = '<tr rel="'+id+'"><td class="center">'+id+'</td><td>'+name+' <input type="hidden" name="product_id[]" value="'+id+'"></td><td>'+status+'</td><td class="center"><a class="remove-product-coupon red"><i class="ace-icon fa fa-trash-o bigger-130"></i></a></td></tr>';
		$('.console-product tr').each(function () {
            var idx = ($(this).attr('rel'));
            if(id == idx){
            	count = 1;
            }
        });
        if(count==0){
        	$('.expand-product-items').append(html);
        }
		$(this).parent().parent().remove();
	});
	$('body').on("click", ".remove-product-coupon", function() {
		$(this).parent().parent().remove();
	});
	$(document).on("click", "#coupon_submit", function() {
		var shop_id = $('#shop_chosen_ajax').val();
		var product_id = $('#product_shop_ajax').val();
		var code = $('#code').val();
		var name = $('#name').val();
		var campaign = $('#campaign').val();
		var type = $('#type').val();
		var scope = $('#scope').val();
		var discount = $('#discount').val();

		if(name == '')
		{
			$("#name").focus();
			showMsg("Chưa nhập tên chiến dịch!");
			return false;
		}
		else{
			$("#message_show").html('');
		}
		if(type!=2){
			if(code == '')
			{
				$("#code").focus();
				showMsg("Vui lòng nhập mã!");
				return false;
			}
			else{
				$("#message_show").html('');
			}
		}

		if(type == '')
		{
			$("#type").focus();
			showMsg("Chọn kiểu coupon!");
			return false;
		}
		else{
			$("#message_show").html('');
		}
		if(scope == '')
		{
			$("#scope").focus();
			showMsg("Chọn phạm vi áp dụng!");
			return false;
		}
		else{
			$("#message_show").html('');
		}
		if(type!=2){
			if(discount == '')
			{
				$("#discount").focus();
				showMsg("Vui lòng nhập giá trị Coupon!");
				return false;
			}
			else{
				$("#message_show").html('');
			}
		}
		var data = jQuery.parseJSON(
			jQuery.ajax({
				url: BASE_URL + 'coupon/coupon_check_ajax?id='+ id +'&code='+ code,
				async: false,
				dataType: 'json'
			}).responseText
		);
		if(data.error)
		{
			$("#product_shop_ajax").focus();
			showMsg(data.msg);
			return false;
		}
		else{
			$("#message_show").html('');
		}
	});

		$(".cp_change_status").change(function(){
		var status = $(this).val();
		if (status == '') {return false;}
		var coupon_id = ($(this).attr('coupon-id'));
		var product_id = ($(this).attr('product-id'));
		$.ajax({
			type: "POST",
			url: BASE_URL + 'coupon/change_cp_status?coupon_id='+ coupon_id +'&product_id='+ product_id+'&status='+ status,
			data: "ajax",
			async: true,
			success: function(data){
				$(".status_cp"+product_id).html(data);
			}
		})
	});
});
