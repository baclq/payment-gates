$(document).ready(function(){
	$(document).on("click", "#ship_shop_add", function() {
		var ship_shop_id = $('#ship_shop_id').val();
		if(ship_shop_id == '')
		{
			$("#ship_shop_id").focus();
            showMsgPop("Vui lòng chọn Shop!");
			return false;
		}
		else{
			$("#message_pop_show").html('');
		}
        $.ajax({
            type: "POST",
            url: BASE_URL + 'ship/add_ship_shop?shop_id='+ ship_shop_id,
            data: "ajax",
            async: true,
            success: function(response){
                if(!response.error){
                    showMsgPop(response.msg,'success');
                    location.reload();
                }
                else
                    showMsgPop(response.msg);
            }
        });
    });

    $(document).on("click", "#ship_province_add", function() {
		var province_id = $('#province_id').val();
		if(province_id == '')
		{
			$("#province_id").focus();
            showMsgPop("Vui lòng chọn Tỉnh/thành!");
			return false;
		}
		else{
			$("#message_pop_show").html('');
		}
        $.ajax({
            type: "POST",
            url: BASE_URL + 'ship/addProvinceShop?shop_id='+ shop_id + '&province_id=' + province_id,
            data: "ajax",
            async: true,
            success: function(response){
                if(!response.error){
                    showMsgPop(response.msg,'success');
                    location.reload();
                }
                else
                    showMsgPop(response.msg);
            }
        });
    });

    $(document).on("click", ".shiping_add_fee, .edit_ship_province_method", function() {
        var id = $(this).attr("rel");
        if($(this).attr("type") == 'update'){
            var url_params = BASE_URL + 'ship/add_method_province?type='+ $(this).attr("type") + '&id=' + id;
        }
        else{
            var url_params = BASE_URL + 'ship/add_method_province?&province_id=' + id;
        }

        $.ajax({
            type: "POST",
            url: url_params,
            data: "ajax",
            async: true,
            success: function(kq){
                if(kq){
                    $('#myModalLabel').html(kq);
                    $('#myModalLabel').modal();
                }else{
                    alert('Đã xảy ra lỗi!');
                }
            }
        })
    });

    $(document).on("click", "#shipping_method_submit", function() {
        var id = $(this).attr("rel");
        var shop_id = $(this).attr("shop_id");
        var method_name = $("#method_name").val();
        var method_type = $("#method_type").val();
        var method_order_from = $("#method_order_from").val();
        var method_order_to = $("#method_order_to").val();
        var method_fee = $("#method_fee").val();
        var url_param_update = '';
        if(method_name == '')
        {
            $("#method_name").focus();
            showMsgPop("Vui nhập tên phương thức!");
            return false;
        }
        else{
            $("#message_pop_show").html('');
        }
        if(method_fee == '')
        {
            $("#method_fee").focus();
            showMsgPop("Vui nhập giá ship!");
            return false;
        }
        else{
            $("#message_pop_show").html('');
        }
        if($(this).attr("button_type") == 'update'){
            url_param_update = '&button_type=update';
        }
        $.ajax({
            type: "POST",
            url: BASE_URL + 'ship/add_method_ship?shop_id='+ shop_id + '&province_id=' + id + '&method_name=' + method_name + '&method_type=' + method_type+ '&method_order_from=' + method_order_from + '&method_order_to=' + method_order_to + '&method_fee=' + method_fee + url_param_update,
            data: "ajax",
            async: true,
            success: function(response){
                if(!response.error){
                    showMsgPop(response.msg,'success');
                    location.reload();
                }else{
                    showMsgPop(response.msg);
                }
            }
        });
    });

    $(document).on("click", ".btn-up", function() {
        $(this).addClass('hide');
        $(this).parents('.btn-up-content').find('.input-group').removeClass('hide');
    });

    $(".ship_province_delete").on(ace.click_event, function () {
        var id = $(this).attr("rel");
        bootbox.confirm("Bạn có chắc chắn xoá phương thức Ship ở tỉnh này?", function (result) {
            if (result) {
                $.ajax({
                    type: "POST",
                    url: BASE_URL + 'ship/ship_province_delete?shop_id='+ shop_id + '&province_id=' + id,
                    data: "ajax",
                    async: true,
                    success: function (kq) {
                        $("#panel_"+id).remove();
                    }
                })
            }             ;
        });
    });

    $(document).on("click", "#shipping_method_delete", function() {
        var id = $(this).attr("rel");
        bootbox.confirm("Bạn có chắc chắn xoá phương thức Ship ở tỉnh này?", function (result) {
            if (result) {
                $.ajax({
                    type: "POST",
                    url: BASE_URL + 'ship/delete_ship_method?id='+ id,
                    data: "ajax",
                    async: true,
                    success: function(response){
                        if(!response.error){
                            showMsgPop(response.msg,'success');
                            location.reload();
                        }else{
                            showMsgPop(response.msg);
                        }
                    }
                })
            };
        });
    });

});