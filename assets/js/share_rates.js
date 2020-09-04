$(document).ready(function(){
	$("#shop_chosen_ajax").change(function(){
		var id = $(this).val();
		$.ajax({
			type: "POST",
			url: BASE_URL + 'product/getProductByShop/'+ id,
			data: "ajax",
			async: true,
			success: function(response){
                if(response){
                    $("#product_display").show();
                    $("#product_shop_ajax").html(response);
                }
                else{
                    $("#product_display").hide();
                }
			}
		});
		$.ajax({
			type: "POST",
			url: BASE_URL + 'shop/get_shop_category_share_rate/'+ id,
			data: "ajax",
			async: true,
			success: function(response){
                if(response){
                    $("#category_display").show();
                    $("#shop_category_ajax").html(response);
                }
                else{
                    $("#category_display").hide();
                }

			}
		});
	});
	$(document).on("click", "#share_rate_submit", function() {
		var shop_id = $('#shop_chosen_ajax').val();
		var category_id = $('#shop_category_ajax').val();
		var product_id = $('#product_shop_ajax').val();
		var aff_rate = $('#aff_rate').val();
		var aff_mgr_rate = $('#aff_mgr_rate').val();
		var sale_rate = $('#sale_rate').val();
		var network_rate = $('#network_rate').val();
		var order_level = $('#order_level').val();
		if(shop_id == '')
		{
			$("#shop_chosen_ajax").focus();
			showMsg("Vui lòng chọn Shop!");
			return false;
		}
		else{
			$("#message_show").html('');
		}
        if(aff_rate == '')
		{
			$("#aff_rate").focus();
			showMsg("Vui lòng nhập tỉ lệ cho Affiliate!");
			return false;
		}
		else{
			$("#message_show").html('');
		}
        if(aff_mgr_rate == '')
        {
            $("#aff_mgr_rate").focus();
            showMsg("Vui lòng nhập tỉ lệ cho Affiliate Manager!");
            return false;
        }
        else{
            $("#message_show").html('');
        }
        if(network_rate == '')
        {
            $("#network_rate").focus();
            showMsg("Vui lòng nhập tỉ lệ cho Network!");
            return false;
        }
        else{
            $("#message_show").html('');
        }
        //var total_rate = parseFloat(aff_rate) + parseFloat($('#aff_mgr_rate').val()) + parseFloat($('#sale_rate').val()) + parseFloat($('#network_rate').val());
        //if(total_rate >= 100)
        //{
        //    $("#aff_rate").focus();
        //    showMsg("Tổng tỉ lệ chia Aff, AffMgr, Sale, Network phải nhỏ hơn 100, vui lòng kiểm tra lại!");
        //    return false;
        //}
        //else{
        //    $("#message_show").html('');
        //}
		var data = jQuery.parseJSON(
			jQuery.ajax({
				url: BASE_URL + 'configure/share_rate_check_ajax?id='+ id + '&shop_id='+ shop_id + '&category_id='+ category_id + '&product_id='+ product_id + '&order_level='+ order_level,
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

    $(".share_rate_change_status").on(ace.click_event, function() {
        var id = $(this).attr("rel");
        bootbox.confirm("Bạn có chắc chắn duyệt tỉ lệ chia này?", function(result) {
            if(result) {
                $.ajax({
                    type: "POST",
                    url: BASE_URL + 'configure/share_rate_change_status?id='+ id + '&status=1',
                    data: "ajax",
                    async: true,
                    success: function(kq){
                        if($(".td_active"+id).length){
                            $(".td_active"+id).html("<span class='label label-xs label-success'>Đã duyệt</span>");
                        }
                        else{
                            location.reload();
                        }

                    }
                })
            };
        });
    });
});