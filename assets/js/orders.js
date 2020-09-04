$(document).ready(function(){
    // tìm kiếm đơn hàng
    $('#order_submit').click(function(e) {
        ajaxSearch();
    });
    $(document).on("change", "#order_ship_cod, #order_ship_payment", function() {
        $("#chosen_store").val('');
    });

    $(document).on("click", "#order_edit_submit", function() {
        var sub_status = $('#sub_status').val();
        if(sub_status == '' || sub_status == 98)
        {
            $("#sub_status").focus();
            showMsg("Vui lòng chọn trạng thái phụ!");
            return false;
        }
    });
    $(document).on("click", "#order_statistic_excel", function() {
        var month_filter = $('#month_filter').val();
        var year_filter = $('#year_filter').val();
        var order_status = $('#order_status').val();
        var pay_type = $('#pay_type').val();
        var shop_id = $('#shop_id').val();
        if(shop_id == '')
        {
            $("#shop_id").focus();
            showMsg("Vui lòng chọn Shop!");
            return false;
        }
        location.href = BASE_URL + "excel/order?month_filter="+ month_filter + "&year_filter="+ year_filter + "&shop_id="+ shop_id + "&order_status="+ order_status + "&pay_type="+ pay_type;
    });
    $(document).on("click", "#order_transport_submit", function() {
        var id = $(this).attr('rel');
        var shop_ship_address = $('#shop_ship_address').val();
        var ship_partner_id = $('#ship_partner_id').val();
        var chosen_store = $('#chosen_store').val();
        var order_ship_cod = $('#order_ship_cod').val();
        var order_ship_payment = $('#order_ship_payment').val();
        var is_ghn = $('#is_ghn').val();
        var length = $('#length').val();
        var width = $('#width').val();
        var height = $('#height').val();
        if(chosen_store == '')
        {
            $("#chosen_store").focus();
            alert("Vui lòng chọn Kho lấy hàng!");
            return false;
        }
        if (typeof shop_ship_address != 'undefined') {
            var ship_address = shop_ship_address;
        }else{
            var ship_address = '';
        }
        if(is_ghn == 1){
            if(length == ''){
                $("#length").focus();
                alert("Vui lòng nhập chiều dài của kiện hàng!");
                return false;
            }
            if(width == ''){
                $("#width").focus();
                alert("Vui lòng nhập chiều rộng của kiện hàng!");
                return false;
            }
            if(height == ''){
                $("#height").focus();
                alert("Vui lòng nhập chiều cao của kiện hàng!");
                return false;
            }
        }
        $.ajax({
            type: "POST",
            url: BASE_URL + 'order/order_transport?type=update&id='+ id + '&ship_address=' + ship_address + '&ship_partner_id='+ship_partner_id + '&store_id='+chosen_store + '&order_ship_cod='+order_ship_cod + '&order_ship_payment='+order_ship_payment + '&length=' + length + '&width=' + width + '&height=' + height,
            data: "ajax",
            async: true,
            success: function(response){
                if(!response.error){
                    alert('Tạo vận đơn thành công!');
                    location.reload();
                }
                else
                    alert(response.msg);
                return false;
            }
        })
    });
    $(document).on("change", "#ship_partner_id", function() {
        var partner_id = $(this).val();
        if(partner_id == 1){
            $("#order_print_ship_transport_submit").show();
        }
        else{
            $("#order_print_ship_transport_submit").hide();
        }
        $('#chosen_store').val('');
        $('#chosen_store_print').val('');
        $('#ship_code_total').val('');
        $('#ship_code_display').text('');
        $.ajax({
            type: "POST",
            url: BASE_URL + 'order/get_store',
            data: {partner_id: partner_id},
            async: true,
            success: function(response){
                $("#chosen_store").html(response.data_html);
                $("#chosen_store_print").html(response.data_html);
            }
        });
        $.ajax({
            type: "POST",
            url: BASE_URL + 'order/stock',
            data: {id: partner_id},
            async: true,
            success: function(response){
                var obj = JSON.parse(response);
                if(obj.status == 200){
                    $('.hub_stock').html(obj.html);
                }else{
                    $('.hub_stock').html('');
                }                
            }
        });
    });
    $(document).on("change", "#chosen_store", function() {
        var chosen_store = $(this).val();
        var ship_partner_id = $('#ship_partner_id').val();
        var order_ship_cod = $('#order_ship_cod').val();
        var order_ship_payment = $('#order_ship_payment').val();
        var province_ajax = $('#province_ajax').val();
        var district_ajax = $('#district_ajax').val();
        $.ajax({
            type: "POST",
            url: BASE_URL + 'order/get_order_store',
            data: {partner_id: ship_partner_id, store_id: chosen_store},
            async: true,
            success: function(response){
                $("#store_name").val(response.name);
                $("#store_mobile").val(response.mobile);
                $("#store_full_name").val(response.full_name);
                $("#store_address").val(response.address);
            }
        });
        $.ajax({
            type: "POST",
            url: BASE_URL + 'order/order_transport_cal?type=view&id=' + order_id + '&province_ajax=' + province_ajax + '&district_ajax=' + district_ajax + '&ship_partner_id='+ship_partner_id + '&store_id='+chosen_store + '&order_ship_cod='+order_ship_cod + '&order_ship_payment='+order_ship_payment,
            data: "ajax",
            async: true,
            success: function(response){
                if(!response.error){
                    $("#order_ship_transport").text(response.order_ship_transport);
                    $("#order_ship_cod_fee").text(response.order_ship_cod_fee);
                }
                else
                    alert(response.msg);
            }
        })
    });
    // chi tiết đơn hàng
    $(".bootbox-confirm").on(ace.click_event, function() {
        var id = $(this).attr("rel");
        var parent_tr = $(this).parents('tr');
        bootbox.confirm("Bạn có chắc chắn xoá sản phẩm khỏi đơn hàng này ?", function(result) {
            if(result) {
                $.ajax({
                    type: "POST",
                    url: BASE_URL + 'order/order_product_delete/?order_id='+order_id+'&product_id='+ id,
                    data: "ajax",
                    async: true,
                    success: function(kq){
                        parent_tr.slideUp("slow");
                        location.reload();
                    }
                })
            };
        });
    });
    $(document).on("click", "#order_transport", function() {
        var province_ajax = $('#province_ajax').val();
        var district_ajax = $('#district_ajax').val();
        if(province_ajax == '')
        {
            $("#province_ajax").focus();
            showMsg("Vui lòng chọn Tỉnh/thành trước khi tạo vận đơn!");
            return false;
        }
        else{
            $("#message_show").html('');
        }
        if(district_ajax == '')
        {
            $("#district_ajax").focus();
            showMsg("Vui lòng chọn Quận/huyện trước khi tạo vận đơn!");
            return false;
        }
        else{
            $("#message_show").html('');
        }
        $.ajax({
            type: "POST",
            url: BASE_URL + 'order/order_transport?type=view&id=' + order_id + '&province_ajax=' + province_ajax + '&district_ajax=' + district_ajax + '&store_id=1&order_ship_cod=1&order_ship_payment=1',
            data: "ajax",
            async: true,
            success: function(response){
                if(!response.error){
                    $('#myModal').html(response);
                    $('#myModal').modal();
                }
                else
                    alert(response.msg);
            }
        })
    });
    $("#order_transport_cancel").on(ace.click_event, function() {
        var id = $(this).attr("rel");
        var parent_tr = $(this).parents('tr');
        bootbox.confirm("Bạn có chắc chắn huỷ vận đơn?", function(result) {
            if(result) {
                $.ajax({
                    type: "POST",
                    url: BASE_URL + 'order/order_transport_cancel',
                    data: {order_id:order_id},
                    async: true,
                    success: function(kq){
                        if(kq){
                            //location.reload();
                        }
                        else{
                            alert("Lỗi, vui lòng thử lại!");
                            return false;
                        }
                    }
                })
            };
        });
    });
    $(document).on("click", ".order_product_add", function() {
        var product_id = $(this).attr('rel');
        $.ajax({
            type: "POST",
            url: BASE_URL + 'order/order_product_ajax',
            data: {product_id:product_id, order_id:order_id},
            async: true,
            success: function(kq){
                if(kq){
                    alert('Cập nhật thành công!');
                    location.reload();
                }else{
                    alert('Đã xảy ra lỗi!');
                }
            }
        })
    });
    $("#order_retransport").on(ace.click_event, function() {
        var id = $(this).attr("rel");
        var parent_tr = $(this).parents('tr');
        bootbox.confirm("Bạn có chắc chắn muốn gửi lại vận chuyển?", function(result) {
            if(result) {
                $.ajax({
                    type: "POST",
                    url: BASE_URL + 'order/order_retransport/?order_id='+order_id,
                    data: "ajax",
                    async: true,
                    success: function(kq){
                        parent_tr.slideUp("slow");
                        location.reload();
                    }
                })
            };
        });
    });
    if($('.edit_text').length >0){
        $(window).load(function(){
            $.fn.editable.defaults.mode = 'inline';
            $('.edit_text').editable({
                type: 'text',
                success: function(k,v){
                    var field = $(this).attr('rel');
                    $.ajax({
                        type: "POST",
                        url: BASE_URL + 'order/order_update',
                        data: {order_id: order_id,field:field,value:v},
                        async: true,
                        success: function(kq){
                            if(kq == 1){
                                location.reload();
                            }
                        }
                    })
                }
            });
        });
    }

});
function ajaxSearch() {
    waitingDialog.show('Đang tải dữ liệu.......');
    var url_params = '';
    var province_id = $('#province_id_ajax').val();
    var pay_status = $('#pay_status').val();
    var shop_id = $('#shop_id').val();
    var sale_id = $('#sale_id').val();
    var pay_type = $('#pay_type').val();
    var order_status = $('#order_status').val();
    var key_search = $('input[name=key_search]').val();
    var sub_status = $('#sub_status').val();
    var time_filter = $('#reportrange span').text();
    var order_shop_id = $('#order_shop_id_ajax').val();
    url_params += "time_filter=" + encodeURIComponent(time_filter);
    if (typeof order_shop_id != 'undefined') {
        url_params += "&shop_id=" + order_shop_id;
    }
    if (province_id !== "" && typeof province_id != 'undefined') {
        url_params += "&province_id=" + province_id;
    }
    if (pay_status !== "" && typeof pay_status != 'undefined') {
        url_params += "&pay_status=" + pay_status;
    }
    if (shop_id !== "" && typeof shop_id != 'undefined') {
        url_params += "&shop_id=" + shop_id;
    }
    if (sale_id !== "" && typeof sale_id != 'undefined') {
        url_params += "&sale_id=" + sale_id;
    }
    if (pay_type !== "" && typeof pay_type != 'undefined') {
        url_params += "&pay_type=" + pay_type;
    }
    if (order_status !== "" && typeof order_status != 'undefined') {
        url_params += "&order_status=" + order_status;
    }
    if (key_search !== "" && typeof key_search != 'undefined') {
        url_params += "&key_search=" + key_search;
    }
    if (sub_status !== "" && typeof sub_status != 'undefined') {
        url_params += "&sub_status=" + sub_status;
    }
    $.ajax({
        url: BASE_URL + "order/getOrdersAjax?" + url_params,
        type: "post",
        dateType: "text",
        success: function (result) {
            if (result) {
                $('#detail-data').html(result);
                waitingDialog.hide();
            }
        }
    });
    return false;
}
$(document).on("click", ".order_product_edit_modal", function() {
    var product_id = $(this).attr("rel");
    $.ajax({
        type: "POST",
        url: BASE_URL + 'order/order_product_modal?type=form&order_id='+order_id+'&product_id=' + product_id,
        data: "ajax",
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
$(document).on("click", "#order_sale_update", function() {
    var sale_id = $(this).attr("rel");
    $.ajax({
        type: "POST",
        url: BASE_URL + 'order/transfer_sale',
        data: {order_id:order_id, sale_id:sale_id},
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
$(document).on("click", "#submit_order_product", function() {
    var product_id = $(this).attr("rel");
    var order_product_quantity = $("#order_product_quantity").val();
    var order_product_discount = $("#order_product_discount").val();
    if(order_product_quantity <= 0)
    {
        $("#order_product_quantity").focus();
        $("#popup_msg").text("Số lượng phải lớn hơn 0!");
        $("#popup_show_msg").show();
        return false;
    }else{
        $("#order_product_quantity").blur();
        $("#popup_msg").text("");
        $("#popup_show_msg").hide();
    }
    $.ajax({
        type: "POST",
        url: BASE_URL + 'order/order_product_ajax',
        data: {order_id:order_id, product_id:product_id,quantity:order_product_quantity,discount:order_product_discount},
        async: true,
        success: function(kq){
            if(kq){
                alert('Cập nhật thành công!');
                location.reload();
            }else{
                alert('Đã xảy ra lỗi!');
            }
        }
    })
});
$(document).on("click", "#btn_find_ajax", function() {
    var product_name_search = $("#product_name_search").val();
    if(product_name_search == 0)
    {
        $("#product_name_search").focus();
        $("#popup_msg").text("Vui lòng nhập tên sản phẩm!");
        $("#popup_show_msg").show();
        return false;
    }
    else{
        $("#product_name_search").blur();
        $("#popup_msg").text("");
        $("#popup_show_msg").hide();
    }
    $.ajax({
        type: "POST",
        url: BASE_URL + 'product/product_search_ajax/?shop_id='+ shop_id +'&product_name_search='+ encodeURI(product_name_search),
        data: "ajax",
        async: true,
        success: function(kq){
            $("#product_display_ajax").html(kq);
        }
    })
});
$(document).on("click", "#order_transport_print", function() {
    $.ajax({
        type: "POST",
        url: BASE_URL + 'order/ship_tranport_print',
        data: "ajax",
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
$(document).on("change", "#chosen_store_print", function() {
    $("#ship_code_total").html('');
    $("#ship_code_display").html('');
    var ship_partner_id = $('#ship_partner_id').val();
    var store_id = $(this).val();
    if(ship_partner_id == '')
    {
        $("#ship_partner_id").focus();
        alert("Vui lòng chọn một đơn vị Ship!");
        return false;
    }
    $.ajax({
        type: "POST",
        url: BASE_URL + 'order/get_order_ship_transport',
        data: {store_id: store_id, ship_partner_id:ship_partner_id},
        async: true,
        success: function(response){
            $("#ship_code_total").html(response.ship_code_total);
            $("#ship_code_display").html(response.data_html);
            $("#ship_code_display_hidden").html(response.data_string);
        }
    });
});
$(document).on("change", "#order_status", function() {
    var status = $(this).val();
    $.ajax({
        type: "POST",
        url: BASE_URL + 'order/get_sub_status',
        data: {status: status},
        async: true,
        success: function(response){
            $("#sub_status").html(response.data_html);
        }
    });
});
$(document).on("click", "#order_update_ship_transport_submit", function() {
    var ship_code_display_hidden = $("#ship_code_display_hidden").text();
    var store_id = $('#chosen_store_print').val();
    if(ship_code_display_hidden == '')
    {
        alert("Không tồn tại mã vận đơn, vui lòng thử lại!");
        return false;
    }
    $.ajax({
        type: "POST",
        url: BASE_URL + 'order/update_ship_transport_print',
        data: {store_id: store_id, ship_code_list: ship_code_display_hidden},
        async: true,
        success: function(response){
            alert('Cập nhật thành công!');
            location.reload();
        }
    });
});
$(document).on("click", "#order_print_ship_transport_list_submit", function() {
    var ship_partner_id = $("#ship_partner_id").val();
    var chosen_store_print = $("#chosen_store_print").val();
    var ship_code_display_hidden = $("#ship_code_display_hidden").text();
    if(ship_partner_id == '')
    {
        $("#ship_partner_id").focus();
        alert("Vui lòng chọn một đơn vị Ship!");
        return false;
    }
    if(chosen_store_print == '' || ship_code_display_hidden == '')
    {
        $("#chosen_store_print").focus();
        alert("Bạn chưa chọn kho, hoặc kho này không tồn tại vận đơn!");
        return false;
    }

    window.open(BASE_URL + 'order/transport_list?code=' + ship_code_display_hidden);
});
$(document).on("click", "#order_print_ship_transport_submit", function() {
    var store_id = $(this).val();
    var ship_code_display_hidden = $("#ship_code_display_hidden").text();
    var chosen_store_print = $("#chosen_store_print").val();
    if(chosen_store_print == '' || ship_code_display_hidden == '')
    {
        $("#chosen_store_print").focus();
        alert("Bạn chưa chọn kho hoặc kho này không tồn tại vận đơn!");
        return false;
    }
    window.open('https://seller.shipchung.vn/#/print_new?code=' + ship_code_display_hidden);
});
$(document).on("click", "#order_change_sale_submit", function() {
    var sale_id = $("#sale_id_select").val();
    if(sale_id == '')
    {
        $("#sale_id_select").focus();
        alert("Vui lòng nhập chọn Sale!");
        return false;
    }
    if(sale_id >0)
    {
        $.ajax({
            type: "POST",
            url: BASE_URL + 'order/change_sale',
            data: {order_id:order_id, sale_id:sale_id},
            async: true,
            success: function(response){
                if(!response.error){
                    alert(response.msg);
                    location.reload();
                }
                else
                    alert(response.msg);
            }
        })
    }
    else{
        alert("Không tồn tại Sale muốn chuyển!");
        return false;
    }
});
$(document).on("click", "#order_send_sms", function() {
    var mobile = $(this).attr('rel');
    var order_id = $(this).attr('order_id_rel');
    var sms_content = $('#sms_content').val();
    if(!validatePhone(mobile))
    {
        showMsg("Số điện thoại gửi không đúng!");
        return false;
    }
    else{
        $("#message_show").html('');
    }
    if(sms_content == '')
    {
        $("#sms_content").focus();
        showMsg("Vui lòng nhập nội dung!");
        return false;
    }
    else{
        $("#message_show").html('');
    }
    $.ajax({
        type: "POST",
        url: BASE_URL + 'globalaction/smsSend',
        data: {order_id: order_id, mobile: mobile, content: sms_content},
        dateType: "text",
        success: function(response){
            if(!response.error){
                alert(response.msg);
                $('#smsModal').modal('hide');
            }
            else
                alert(response.msg);
        }
    });
});
$(document).on("click", "#order_update_discount_button", function() {
    var discount = $("#order_discount_value").val();
    if(discount == '')
    {
        $("#order_discount_value").focus();
        alert('Vui lòng nhập tiền giảm giá!');
        return false;
    }
    else{
        $("#message_pop_show").html('');
    }
    $.ajax({
        url: BASE_URL + 'order/update_discount_ajax',
        type: "post",
        data: {order_id: order_id, discount: discount},
        dateType: "text",
        success: function (response) {
            if(!response.error){
                alert(response.msg);
                location.reload();
            }
            else
                showMsgPop(response.msg);
        }
    });
});
$(document).on("click", "#order_update_ship_button", function() {
    var ship_fee = $("#order_ship_value").val();
    if(ship_fee == '')
    {
        $("#order_ship_value").focus();
        alert('Vui lòng nhập phí Ship!');
        return false;
    }
    else{
        $("#message_pop_show").html('');
    }
    $.ajax({
        url: BASE_URL + 'order/update_ship_ajax',
        type: "post",
        data: {order_id: order_id, ship_fee: ship_fee},
        dateType: "text",
        success: function (response) {
            if(!response.error){
                alert(response.msg);
                location.reload();
            }
            else
                showMsgPop(response.msg);
        }
    });
});
$(document).on("click", "#order_update_pay_button", function() {
    var pay_fee = $("#order_pay_value").val();
    if(pay_fee == '')
    {
        $("#order_pay_value").focus();
        alert('Vui lòng nhập phí thanh toán!');
        return false;
    }
    else{
        $("#message_pop_show").html('');
    }
    $.ajax({
        url: BASE_URL + 'order/update_pay_ajax',
        type: "post",
        data: {order_id: order_id, pay_fee: pay_fee},
        dateType: "text",
        success: function (response) {
            if(!response.error){
                alert(response.msg);
                location.reload();
            }
            else
                showMsgPop(response.msg);
        }
    });
});