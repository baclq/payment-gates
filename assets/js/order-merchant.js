$(document).ready(function(){
    // tìm kiếm đơn hàng
    $('#order_submit').click(function(e) {
        ajaxSearch();
    });
});
function ajaxSearch() {
    waitingDialog.show('Đang tải dữ liệu.......');
    var url_params = '';
    var province_id = $('#province_id_ajax').val();
    var pay_status = $('#pay_status').val();
    var shop_id = $('#shop_id').val();
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
        url: BASE_URL + "order/getMerchantOrdersAjax?" + url_params,
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