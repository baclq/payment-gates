$(document).on("click", "#sh_submit", function() {
    var store_id = $("#store_id").val();
    var store_note = $("#store_note").val();

    if(store_id == '')
    {
        $("#store_id").focus();
        showMsg('Vui lòng chọn Kho!');
        return false;
    }
    else{
        $("#message_show").html('');
    }
    if(store_note == '')
    {
        $("#store_note").focus();
        showMsg('Vui lòng nhập lý do!');
        return false;
    }
    else{
        $("#message_show").html('');
    }
    // kiểm tra xem phiếu đã có hàng hay chưa
    var data = jQuery.parseJSON(
        jQuery.ajax({
            type: "POST",
            url: BASE_URL + 'store/checkStoreProductSession',
            async: false,
            dataType: 'json'
        }).responseText
    );
    if(data.error){
        showMsg(data.msg);
        return false;
    }
    else{
        $("#message_show").html('');
    }
});
$(document).on("click", "#sh_check_submit", function() {
    var store_id = $("#store_id").val();
    if(store_id == '')
    {
        $("#store_id").focus();
        showMsg('Vui lòng chọn Kho!');
        return false;
    }
    else{
        $("#message_show").html('');
    }
    // kiểm tra xem phiếu đã có hàng hay chưa
    var data = jQuery.parseJSON(
        jQuery.ajax({
            type: "POST",
            url: BASE_URL + 'store/checkStoreProductSession',
            async: false,
            dataType: 'json'
        }).responseText
    );
    if(data.error){
        showMsg(data.msg);
        return false;
    }
    else{
        $("#message_show").html('');
    }
});

$(document).on("click", "#sh_transfer_submit", function() {
    var from_store_id = $("#from_store_id").val();
    var store_id = $("#store_id").val();
    var store_note = $("#store_note").val();

    if(from_store_id == '')
    {
        $("#from_store_id").focus();
        showMsg('Vui lòng chọn kho muốn chuyển!');
        return false;
    }
    else{
        $("#message_show").html('');
    }
    if(store_id == '')
    {
        $("#store_id").focus();
        showMsg('Vui lòng chọn kho đến!');
        return false;
    }
    else{
        $("#message_show").html('');
    }
    if(store_note == '')
    {
        $("#store_note").focus();
        showMsg('Vui lòng nhập lý do!');
        return false;
    }
    else{
        $("#message_show").html('');
    }
    // kiểm tra xem phiếu đã có hàng hay chưa
    var data = jQuery.parseJSON(
        jQuery.ajax({
            type: "POST",
            url: BASE_URL + 'store/checkStoreProductSession',
            async: false,
            dataType: 'json'
        }).responseText
    );
    if(data.error){
        showMsg(data.msg);
        return false;
    }
    else{
        $("#message_show").html('');
    }
});
$(document).ready(function(){
	$(document).on("click", "#store_submit", function() {
		var store_name = $('#store_name').val();
		var store_full_name = $('#store_full_name').val();
		var province_ajax = $('#province_ajax').val();
		var district_ajax = $('#district_ajax').val();
		var store_mobile = $('#store_mobile').val();
		var store_address = $('#store_address').val();
		if(store_name == '')
		{
			$("#store_name").focus();
            showMsg("Vui lòng nhập tên Kho!");
			return false;
		}
		else{
			$("#message_pop_show").html('');
		}
        if(store_full_name == '')
		{
			$("#store_full_name").focus();
            showMsg("Vui lòng nhập Tên chủ Kho!");
			return false;
		}
		else{
			$("#message_pop_show").html('');
		}
        if(province_ajax == '')
		{
			$("#province_ajax").focus();
            showMsg("Vui lòng chọn Tỉnh/Thành phố!");
			return false;
		}
		else{
			$("#message_pop_show").html('');
		}
        if(district_ajax == '')
		{
			$("#district_ajax").focus();
            showMsg("Vui lòng chọn Quận/Huyện!!");
			return false;
		}
		else{
			$("#message_pop_show").html('');
		}
        if(store_mobile == '')
		{
			$("#store_mobile").focus();
            showMsg("Vui lòng nhập Điện thoại Kho!");
			return false;
		}
		else{
			$("#message_pop_show").html('');
		}
        if(store_address == '')
		{
			$("#store_address").focus();
            showMsg("Vui lòng nhập Địa chỉ Kho!");
			return false;
		}
		else{
			$("#message_pop_show").html('');
		}
    });
    $(document).on("click", "#store_shop_submit", function() {
		var store_ajax = $('#store_ajax').val();
		if(store_ajax == '')
		{
			$("#store_ajax").focus();
            showMsg("Vui lòng nhập chọn Kho!");
			return false;
		}
		else{
			$("#message_pop_show").html('');
		}
    });
    $(".store_active_button").on(ace.click_event, function() {
        var id = $(this).attr("rel");
        bootbox.confirm("Bạn có chắc chắn duyệt Kho này?", function(result) {
            if(result) {
                $.ajax({
                    type: "POST",
                    url: BASE_URL + 'store/activeStore/'+ id,
                    data: "ajax",
                    async: true,
                    success: function(response){
                        if(!response.error){
                            showMsg('Cập nhật thành công!');
                            location.reload();
                        }
                        else
                            alert(response.msg);
                    }
                })
            };
        });
    });
    $(".store_shop_active_button").on(ace.click_event, function() {
        var id = $(this).attr("rel");
        bootbox.confirm("Bạn có chắc chắn Kho - Shop này?", function(result) {
            if(result) {
                $.ajax({
                    type: "POST",
                    url: BASE_URL + 'store/activeStoreShop/'+ id,
                    data: "ajax",
                    async: true,
                    success: function(response){
                        if(!response.error){
                            showMsg('Cập nhật thành công!');
                            location.reload();
                        }
                        else
                            alert(response.msg);
                    }
                })
            };
        });
    });
    $(document).on("click", ".store_shop_add_owner", function() {
        var key_word = $("#key_word_add_user").val();
        var store_id = $("#store_id").val();
        if(key_word =='' || !isValidEmailAddress(key_word)){
            $('#key_word_add_user').focus();
            showMsg("Email trống hoặc sai định dạng, vui lòng thử lại!");
            return false;
        }
        if(store_id ==''){
            $('#shop_user_role').focus();
            showMsg("Vui lòng chọn một Kho!");
            return false;
        }
        $.ajax({
            type: "POST",
            url: BASE_URL + 'store/addStoreShopOwnerAjax',
            data: {store_id:store_id,user_email:key_word},
            async: true,
            success: function (kq) {
                if (!kq.error) {
                    showMsg(kq.msg, 'success');
                    location.reload();
                } else {
                    showMsg(kq.msg);
                }
            }
        });
    });
    $(document).on("click", ".edit-store-user", function() {
        var email = $(this).data('email');
        var curent_store = $(this).attr('data-store');
        $('#key_word_add_user').val(email);
        $('#store_id').val(curent_store);
        $('.store_shop_add_owner').html('Cập nhật');
    });

    if($("#receive_at").length){
        // thời gian tạo phiếu
        $('#receive_at').datetimepicker(
            {
                format: 'DD/MM/YYYY HH:mm:ss'
            }
        ).next().on(ace.click_event, function(){
                $(this).prev().focus();
            });
    }
    $(".bootbox-confirm").on(ace.click_event, function() {
        var id = $(this).attr("rel");
        var parent_tr = $(this).parents('tr');
        bootbox.confirm("Bạn có chắc chắn xoá?", function(result) {
            if(result) {
                $.ajax({
                    type: "POST",
                    url: BASE_URL + 'store/deleteStoreHistory',
                    data: {id:id},
                    async: true,
                    success: function(response){
                        if (!response.error) {
                            showMsg(response.msg, 'success');
                            parent_tr.slideUp("slow");
                        }
                        else {
                            showMsg(response.msg);
                        }
                    }
                })
            };
        });
    });

    $(".store_history_active").on(ace.click_event, function() {
        var id = $(this).attr("rel");
        bootbox.confirm("Bạn có chắc chắn duyệt phiếu này?", function(result) {
            if(result) {
                $.ajax({
                    type: "POST",
                    url: BASE_URL + 'store/activeStoreHistory',
                    data: {id:id},
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
    $(document).on("click", "#store_invoice_submit", function() {
        var store_id = $("#store_id").val();
        var selected = [];
        $('.order_check input:checked').each(function() {
            selected.push($(this).val());
        });
        if(store_id == '')
        {
            $("#store_id").focus();
            showMsg('Vui lòng chọn Kho!');
            return false;
        }
        else{
            $("#message_show").html('');
        }
        if (selected.length === 0) {
            alert("Vui lòng đơn!");
            return false;
        }
    });
    $(document).on("click", "#store_print_ship_code_list_submit", function() {
        var partner_id = $("#partner_id").val();
        var store_id = $('#store_id option:selected').attr('status');
        var selected = [];
        $('.order_check input:checked').each(function() {
            selected.push($(this).val());
        });
        if (selected.length === 0) {
            alert("Vui lòng đơn!");
            return false;
        }
        window.open(BASE_URL + 'order/printOrderList?partner_id='+ partner_id + '&store_id='+ store_id +'&code=' + JSON.stringify(selected));
    });
    $(document).on("click", "#store_print_ship_label_list_submit", function() {
        var partner_id = $("#partner_id").val();
        var store_id = $('#store_id option:selected').attr('status');
        var selected = [];
        $('.order_check input:checked').each(function() {
            selected.push($(this).val());
        });
        if(store_id == '')
        {
            $("#store_id").focus();
            showMsg('Vui lòng chọn Kho!');
            return false;
        }
        else{
            $("#message_show").html('');
        }
        if (selected.length === 0) {
            alert("Vui lòng chọn đơn!");
            return false;
        }
        window.open(BASE_URL + 'order/printOrderListLabel?partner_id='+ partner_id + '&store_id='+ store_id +'&code=' + JSON.stringify(selected));
    });
    $(document).on("click", "#store_statistic_excel", function() {
        var store_id = $('#store_id').val();
        var shop_id = $('#shop_id').val();
        if(shop_id == '')
        {
            $("#shop_id").focus();
            showMsg("Vui lòng chọn Shop!");
            return false;
        }
        location.href = BASE_URL + "excel/store_statistic?shop_id="+ shop_id + "&store_id="+ store_id;
    });
    $(document).on("click", ".store_shop_add_modal", function() {
        var store_id = $(this).attr("rel");
        $.ajax({
            type: "POST",
            url: BASE_URL + 'store/addShopToStoreAjax',
            data: {store_id:store_id},
            async: true,
            success: function(kq){
                if(kq){
                    $('#myModal').html(kq);
                    $('#myModal').modal();
                }else{
                    alert('Đã xảy ra lỗi!');
                }
            }
        })
    });
    $(document).on("click", "#btn_find_ajax", function() {
        var shop_name_search = $("#shop_name_search").val();
        if(shop_name_search == 0)
        {
            $("#shop_name_search").focus();
            $("#popup_msg").text("Vui lòng nhập tên Shop!");
            $("#popup_show_msg").show();
            return false;
        }
        else{
            $("#shop_name_search").blur();
            $("#popup_msg").text("");
            $("#popup_show_msg").hide();
        }
        $.ajax({
            type: "POST",
            url: BASE_URL + 'shop/shop_search_ajax/?shop_name_search='+ encodeURI(shop_name_search),
            data: "ajax",
            async: true,
            success: function(kq){
                $("#shop_display_ajax").html(kq);
            }
        })
    });
    $(document).on("click", ".store_shop_add_button", function() {
        var shop_id = $(this).attr('rel');
        $.ajax({
            type: "POST",
            url: BASE_URL + 'store/addStoreShopAjax',
            data: {store_id:store_id, shop_id:shop_id},
            async: true,
            success: function(kq){
                if(kq){
                    alert('Cập nhật thành công!');
                    location.reload();
                }else{
                    alert('Shop này đã tồn tại trong kho!');
                }
            }
        })
    });
    $(".bootbox-confirm-store-shop").on(ace.click_event, function() {
        var id = $(this).attr("rel");
        var parent_tr = $(this).parents('tr');
        bootbox.confirm("Bạn có chắc chắn xoá Shop khỏi Kho này?", function(result) {
            if(result) {
                $.ajax({
                    type: "POST",
                    url: BASE_URL + 'store/deleteStoreShop',
                    data: {id:id},
                    async: true,
                    success: function(kq){
                        parent_tr.slideUp("slow");
                        //location.reload();
                    }
                })
            };
        });
    });
    $(".store_change_ajax").change(function(){
        var id = $(this).val();
        $.ajax({
            type: "POST",
            url: BASE_URL + 'store/getShopByStoreId',
            data: {id:id},
            async: true,
            success: function(data){
                $(".store_shop_change_ajax").html(data);
            }
        })
    });
    $(".store_shop_change_ajax").change(function(){
        var id = $(this).val();
        alert("Shop ID: "+ id);
    });    
});

function getDistrict() {
    var key = document.getElementById("seach-store-id").value;
    $.ajax({
        type: "POST",
        url: BASE_URL + 'store/getDistrict',
        data: {key:key},
        async: true,
        success: function(data){
            $('.store-id-list').html(data);
        }
    });
}