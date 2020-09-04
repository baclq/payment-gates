$(document).ready(function(){
    $("#shop_coupon_ajax").change(function(){
        var id = $(this).val();
        $.ajax({
            type: "POST",
            url: BASE_URL + 'coupon/get_list_coupon_by_shop/'+ id,
            data: "ajax",
            async: true,
            success: function(data){
                $("#campaign_coupon_ajax").html(data);
            }
        })
    });
	$('#campaign_submit').click(function(e) {
		var shop_chosen_ajax = $('#shop_chosen_ajax').val();
		var campaign_title = $('#campaign_title').val();
		var campaign_promo_url = $('#campaign_promo_url').val();
		var campaign_end_date = $('#campaign_end_date').val();
		if(shop_chosen_ajax == '')
		{
			$("#shop_chosen_ajax").focus();
			showMsg("Vui lòng chọn Shop!");
			return false;
		}
		else{
			$("#message_show").html('');
		}
        if(campaign_title == '')
		{
			$("#campaign_title").focus();
			showMsg("Vui lòng nhập tên chiến dịch!");
			return false;
		}
		else{
			$("#message_show").html('');
		}
        if(campaign_promo_url == '')
		{
			$("#campaign_promo_url").focus();
			showMsg("Vui lòng Promotion Url!");
			return false;
		}
		else{
			$("#message_show").html('');
		}
        if(campaign_end_date == '')
		{
			$("#campaign_end_date").focus();
			showMsg("Vui lòng nhập ngày kết thúc!!");
			return false;
		}
		else{
			$("#message_show").html('');
		}
	});
    $(".bootbox-confirm").on(ace.click_event, function() {
        var id = $(this).attr("rel");
        var parent_tr = $(this).parents('tr');
        bootbox.confirm("Bạn có chắc chắn xoá?", function(result) {
            if(result) {
                $.ajax({
                    type: "POST",
                    url: BASE_URL + 'email/deleteEmailCampaign/'+id,
                    dateType: "text",
                    success: function(kq){
                        parent_tr.slideUp("slow");
                    }
                })
            };
        });
    });
});