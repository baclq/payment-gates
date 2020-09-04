$(document).ready(function(){
	var currentURL = document.location.href;
	$("ul.nav.nav-list.menu-left li a").filter(function () {
		var thisURL = $(this).attr("href");
		if(currentURL==location.href){return this.href==location.href}}).parents("ul.nav.nav-list.menu-left li").addClass('open').siblings().removeClass('open');

	$("ul.submenu.menu-left li a").filter(function () {
		var thisURL = $(this).attr("href");
		if(currentURL==location.href){return this.href==location.href}}).parents("ul.nav.nav-list.menu-left li").addClass('active');
	$(document).on("change", "#province_ajax", function() {
		var id = $(this).val();
		$.ajax({
			type: "POST",
			url: BASE_URL + 'globalaction/get_district/'+ id,
			data: "ajax",
			async: true,
			success: function(data){
				$("#district_ajax").html(data);
			}
		})
	});
	$("#module_ajax").change(function(){
		var id = $(this).val();
		$.ajax({
			type: "POST",
			url: BASE_URL + 'configure/getMenu/'+ id,
			data: "ajax",
			async: true,
			success: function(data){
				$("#parent_id_ajax").html(data);
			}
		})
	});
	$("#shop_category_ajax").change(function(){
		var id = $(this).val();
		$.ajax({
			type: "POST",
			url: BASE_URL + 'product/getcatchild/'+ id,
			data: "ajax",
			async: true,
			success: function(data){
				$("#category_child").html(data);
			}
		})
	});
	$("#shop_change_type_button").on("click", function() {
		var shop_id = $(this).attr("rel");
		var shop_type = $(this).attr("shop_type");
        var shop_type_title;
        var shop_url_detail;
        if(shop_type == 1){
            shop_type_title = "Vendor";
            shop_url_detail = "shop/create";
        }
        else{
            shop_type_title = "Merchant";
            shop_url_detail = "shop/merchant_add";
        }

		bootbox.confirm("Bạn có chắc chắn chuyển Shop này thành Shop "+ shop_type_title +"?", function(result) {
			if(result) {
				$.ajax({
					type: "POST",
					url: BASE_URL + 'shop/change_type',
                    data: {shop_id:shop_id,shop_type:shop_type},
					async: true,
					success: function(response){
                        if(!response.error){
                            alert(response.msg,'success');
                            location.href = BASE_URL + shop_url_detail + '/' + shop_id;
                        }
                        else
                            showMsg(response.msg);
					}
				})
			};
		});
	});

	$("#shop_change_type").on("click", function() {
		var shop_id = $(this).attr("rel");
		var shop_type = $('.type-shop').val();
        var shop_type_title = $(".type-shop option:selected").text();

		bootbox.confirm("Bạn có chắc chắn chuyển Shop này thành Shop "+ shop_type_title +"?", function(result) {
			if(result) {
				$.ajax({
					type: "POST",
					url: BASE_URL + 'shop/change_type',
                    data: {shop_id:shop_id,shop_type:shop_type},
					async: true,
					success: function(response){
                        if(!response.error){
                            alert(response.msg,'success');
                            location.href = BASE_URL + 'shop/create/' + shop_id;
                        }
                        else
                            showMsg(response.msg);
					}
				})
			};
		});
	});

    $(".transfer-confirm").on("click", function() {
		var shop_id = $(this).attr("rel");
		var role_id = $(this).attr("role");
		var type = $(this).attr("type");
		$.ajax({
			type: "POST",
			url: BASE_URL + 'shop/transfer_shop_user?shop_id=' + shop_id + '&role_id=' + role_id + '&type=' + type,
			data: "ajax",
			async: true,
			success: function(kq){
                location.href = BASE_URL + 'dashboard';
			}
		})
	});

    $(".transfer-confirm-store").on("click", function() {
		var shop_id = $(this).attr("rel");
		var store_id = $(this).attr("store");
		bootbox.confirm("Bạn có chắc chắn chuyển sang sử dụng Kho này?", function(result) {
			if(result) {
				$.ajax({
					url: BASE_URL + 'store/transferStoreShop',
                    type: "POST",
                    data: {shop_id:shop_id,store_id:store_id},
                    dateType: "text",
					success: function(kq){
                        location.href = BASE_URL + 'dashboard';
					}
				})
			};
		});
	});
	$("#sale_turn_button").on("click", function() {
		var sale_checkbox_status = $("#sale_turn_button:checked").val();
		var sale_checkbox;
		if(typeof sale_checkbox_status != 'undefined')
		{
			sale_checkbox = 1;
		}
		else{
			sale_checkbox = 0;
		}
		$.ajax({
			type: "POST",
			url: BASE_URL + 'shop/sale_turn?sale_checkbox='+ sale_checkbox,
			data: "ajax",
			async: true,
			success: function(kq){
			}
		});
	});
    $("#sub_domain_submit").on("click", function() {
		var sub_domain_name = $("#sub_domain_name").val();
        if(sub_domain_name == ''){
            $("#sub_domain_name").focus();
            showMsg("Vui lòng nhập Subdomain!");
            return false;
        }
        else{
            $("#message_show").html('');
        }
        if(sub_domain_name != '') {
            var sub_domain_check_return = jQuery.parseJSON(JSON.stringify(
                jQuery.ajax({
                    url: BASE_URL + "globalaction/check_subdomain?id_check=" + id_check + "&sub_domain_name=" + sub_domain_name,
                    async: false,
                    dataType: 'json'
                }).responseText
            ));
            var data_return = JSON.parse(sub_domain_check_return);
            if(data_return.error)
            {
                $("#sub_domain_name").focus();
                showMsg(data_return.msg);
                return false;
            }
        }
	});
});
