$(document).ready(function(){
	$(".bootbox-confirm").on(ace.click_event, function() {
		var id = $(this).attr("rel");
		var parent_tr = $(this).parents('tr');
		bootbox.confirm("Bạn có chắc chắn xoá?", function(result) {
			if(result) {
				$.ajax({
					type: "POST",
					url: BASE_URL + 'shop/shop_delete/'+ id,
					data: "ajax",
					async: true,
					success: function(kq){
						parent_tr.slideUp("slow");
					}
				})
			};
		});
	});
	$("#copy_tracking_code").click(function(){
		$("#tracking_code").select();
		document.execCommand('copy');
	});
	$('#shop_submit').click(function(e) {
		var shop_name = $('#shop_name').val();
		var shop_website = $('#shop_website').val();
		var logo_size = document.getElementById('shop_logo').files[0];
        var shop_email = $('#shop_email').val();
        var shop_code = $('#shop_code').val();
        var shop_phone = $('#shop_phone').val();
        var domain_check = $('#domain_check').val();
        var partner_connect_id = $('.partner_connect_id').val();
        var fchat_connect_key = $('.fchat_connect_key').val();
        var shop_domain_sub_error = $('#shop_domain_sub_error').html();
        if(shop_name == '')
        {
            $("#shop_name").focus();
            showMsg("Bạn chưa nhập tên Shop, vui lòng kiểm tra lại!");
            return false;
        }
        else{
            $("#message_show").html('');
        }
      
        // hết kiểm tra website
        if(typeof logo_size !== 'undefined')
        {
            if(typeof document.getElementById('shop_logo') !== 'undefined' && !validateImage(document.getElementById('shop_logo')))
            {
                $("#shop_logo").focus();
                showMsg("Ảnh không hợp lệ, nhập ảnh có đuôi .jpeg/.jpg/.png/.gif, vui lòng kiểm tra lại!");
                return false;
            }
            else{
                $("#message_show").html('');
                if(logo_size.size > 500000){
                    $("#shop_logo").focus();
                    showMsg("Ảnh upload vượt quá kích thước cho phép 500kb, vui lòng kiểm tra lại!");
                    return false;
                }
                else{
                    $("#message_show").html('');
                }
            }
        }
        // kiểm tra thông tin website
        //if(shop_website == '')
        //{
        //    $("#shop_website").focus();
        //    showMsg("Bạn chưa nhập thông tin Website, vui lòng kiểm tra lại!");
        //    return false;
        //}
        //else{
        //    $("#message_show").html('');
        //}
        //if(!checkIsValidDomain(shop_website) && shop_website != '')
        //{
			//$("#shop_website").focus();
			//showMsg("Lỗi! Sai định dạng Website, vui lòng thử lại!");
			//return false;
        //}
        //else{
			//$("#message_show").html('');
        //}
        if(domain_check != '') {
            var domain_check_return = jQuery.parseJSON(JSON.stringify(
                jQuery.ajax({
                    url: BASE_URL + "globalaction/check_domain?shop_id=" + shop_id + "&domain=" + domain_check,
                    async: false,
                    dataType: 'json'
                }).responseText
            ));
            var data_return = JSON.parse(domain_check_return);
            if(data_return.error)
            {
                $("#domain_check").focus();
                showMsg(data_return.msg);
                return false;
            }
        }

        if(shop_email == ''){
            $("#shop_email").focus();
            showMsg("Vui lòng nhập Email!");
            return false;
        }
        else{
             $("#message_show").html('');
        }
        if(shop_email !='' && !isValidEmailAddress(shop_email)){
            $("#shop_email").focus();
            showMsg("Sai định dạng Email!");
            return false;
        }
        else{
             $("#message_show").html('');
        }
        if(shop_phone == ''){
            $("#shop_phone").focus();
            showMsg("Vui lòng nhập số điện thoại!");
            return false;
        }else{
            $("#message_show").html('');
        }
        if(shop_phone !='' && !validatePhone(shop_phone)){
            $("#shop_phone").focus();
            showMsg("Sai định dạng số điện thoại!");
            return false;
        }else{
            $("#message_show").html('');
        }
        if(shop_code == ''){
            $("#shop_code").focus();
            showMsg("Vui lòng nhập Sub domain!");
            return false;
        }
        else{
            $("#message_show").html('');
        }
        if(shop_code != '' && (shop_code.length < 3 || shop_code.length > 20))
        {
            $("#shop_code").focus();
            showMsg("Sub domain giới hạn từ 3 đến 20 ký tự, vui lòng kiểm tra lại!");
            return false;
        }
        else{
            $("#message_show").html('');
        }
        if(shop_domain_sub_error !=''){
            $("#shop_code").focus();
            showMsg("Sub Domain không hợp lệ, vui lòng kiểm tra lại!");
            return false;
        }else{
            $("#message_show").html('');
        }
        if(partner_connect_id != '') {
            var partner_check_return = jQuery.parseJSON(JSON.stringify(
                jQuery.ajax({
                    url: BASE_URL + "globalaction/checkPartnerId?shop_id=" + shop_id + "&partner_connect_id=" + partner_connect_id,
                    async: false,
                    dataType: 'json'
                }).responseText
            ));
            var partner_data_return = JSON.parse(partner_check_return);
            if(partner_data_return.error)
            {
                $(".partner_connect_id").focus();
                showMsg(partner_data_return.msg);
                return false;
            }
        }

        if(fchat_connect_key != '') {            
            var key_check_return = jQuery.parseJSON(JSON.stringify(
                jQuery.ajax({
                    url: "/shop/connect",
                    type: "POST",
                    data: {
                        'id' : fchat_connect_key,
                        'type' : 'key'
                    },
                    async: false,
                    dataType: 'json'
                }).responseText
            ));
            var key_data_return = JSON.parse(key_check_return);
            if(key_data_return.status == 201)
            {
                $(".fchat_connect_key").focus();
                showMsg(key_data_return.msg);
                return false;
            }
        }
        $("#shop_form").submit();
	});
    $('#shop_merchant_submit').click(function(e) {
        var shop_code = $('#shop_code').val();
        var domain_check = $('#domain_check').val();
        var shop_domain_sub_error = $('#shop_domain_sub_error').html();
        if(shop_code == ''){
            $("#shop_code").focus();
            showMsg("Vui lòng nhập Sub domain!");
            return false;
        }
        else{
            $("#message_show").html('');
        }

        if(shop_code != '' && (shop_code.length < 4 || shop_code.length > 20))
        {
            $("#shop_code").focus();
            showMsg("Sub domain giới hạn từ 4 đến 20 ký tự, vui lòng kiểm tra lại!");
            return false;
        }
        else{
            $("#message_show").html('');
        }
        if(shop_domain_sub_error !=''){
            $("#shop_code").focus();
            showMsg("Sub Domain không hợp lệ, vui lòng kiểm tra lại!");
            return false;
        }else{
            $("#message_show").html('');
        }

        if(domain_check != '') {
            var domain_check_return = jQuery.parseJSON(JSON.stringify(
                jQuery.ajax({
                    url: BASE_URL + "globalaction/check_domain?shop_id=" + shop_id + "&domain=" + domain_check,
                    async: false,
                    dataType: 'json'
                }).responseText
            ));
            var data_return = JSON.parse(domain_check_return);
            if(data_return.error)
            {
                $("#domain_check").focus();
                showMsg(data_return.msg);
                return false;
            }
        }
	});
	$('#chosen_at_home').click(function(e) {
		var customer_address = $('#customer_address').val();
		if(customer_address == '')
		{
			$("#customer_address").focus();
			showMsg("Lỗi! Bạn chưa nhập địa chỉ thanh toán!");
			return false;
		}
		else{
			$("#message_show").html('');
		}
	});
	
	$(document).on("change", "#shop_change_status", function() {
		var id = $(this).attr('rel');
		var status = $(this).val();
        if(status == 4 || status == 5){
            if(status == 4)
            {
                var title_confirm = "Nhập lý do từ chối Shop này";
            }
            else
            {
                var title_confirm = "Nhập lý do Hủy Shop này";
            }
            bootbox.prompt(title_confirm, function(result){
                if(result){
                    $.ajax({
                        type: "POST",
                        url: BASE_URL + 'shop/shop_change_status?id='+ id + '&status='+ status + '&message=' + result,
                        data: "ajax",
                        async: true,
                        success: function(response){
                            if(!response.error){
                                showMsg(response.msg,'success');
                                location.reload();
                            }
                            else
                                showMsg(response.msg);
                        }
                    });
                }
            });
            return false;
        }
        else{
            $.ajax({
                type: "POST",
                url: BASE_URL + 'shop/shop_change_status?id='+ id + '&status='+ status,
                data: "ajax",
                async: true,
                success: function(response){
                    if(!response.error){
                        showMsg(response.msg,'success');
                    }
                    else
                        showMsg(response.msg);
                }
            });
        }
    });
	
	$("#user_btn_find").click(function(){
		var key_word = $("#key_word_add_user").val();
		if(key_word =='' || !isValidEmailAddress(key_word)){
			$('#key_word_add_user').focus();
			showMsg("Email trống hoặc sai định dạng, vui lòng thử lại!");
		}
		else
		{
			$("#message_pop_show").html("");
			$.ajax({
				type: "POST",
				url: BASE_URL + 'user/user_search_ajax?key_word='+ encodeURI(key_word),
				data: "ajax",
				async: true,
				success: function(kq){
					$("#user_display_ajax").html(kq);
				}
			})
		}
	});
	$(document).on("click", ".shop_user_add", function() {
        var key_word = $("#key_word_add_user").val();
        var shop_user_role = $("#shop_user_role").val();
        if(key_word =='' || !isValidEmailAddress(key_word)){
            $('#key_word_add_user').focus();
            showMsg("Email trống hoặc sai định dạng, vui lòng thử lại!");
            return false;
        }
        if(shop_user_role ==''){
            $('#shop_user_role').focus();
            showMsg("Vui lòng chọn một quyền!");
            return false;
        }
        var user_id = $(this).attr('rel');
        var role_id = $("#shop_user_role").val();
        $.ajax({
            type: "POST",
            url: BASE_URL + 'shop/shop_user_ajax',
            data: {shop_id:shop_id, role_id:role_id,user_email:key_word},
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
    $(document).on("click", ".edit-role", function() {
        var email = $(this).data('email');
        var curent_role = $(this).attr('data-role');
        $('#key_word_add_user').val(email);
        $('#shop_user_role').val(curent_role);
        $('.shop_user_add').html('Cập nhật');
    });
	$(".bootbox-confirm-shop-user").on(ace.click_event, function() {
		var id = $(this).attr("rel");
		var su_status = $(this).attr("su_status");
        var parent_tr = $(this).parents('tr');
		bootbox.confirm("Bạn có chắc chắn thay đổi trạng thái này?", function(result) {
			if(result) {
				$.ajax({
					type: "POST",
					url: BASE_URL + 'shop/shop_user_status?id='+ id + '&su_status='+su_status,
					data: "ajax",
					async: true,
					success: function(response){
						if(!response.error){
                            if(su_status == 99){
                                parent_tr.slideUp("slow");
                            }
                            else if(su_status == 1 || su_status == 0){
                                location.reload();
                            }
							showMsg(response.msg,'success');
						}
						else
							showMsg(response.msg);
					}
				})
			};
		});
	});
	$(document).on("click", "#shop_rol_invite", function() {
		var email = $("#key_word_add_user").val();
		$.ajax({
			type: "POST",
			url: BASE_URL + 'shop/shop_rol_invite?email='+ email + '&shop_id='+ shop_id,
			data: "ajax",
			async: true,
			success: function(response){
				if(!response.error){
					showMsgPop(response.msg, 'success');
					$("#user_display_ajax").html('');
				}
				else
					showMsg(response.msg);
			}
		});
	});
    $(document).on("click", "#shop_share_rate_submit", function() {
        var aff_rate = $('#aff_rate').val();
        var sale_rate = $('#sale_rate').val();
        var network_rate = $('#network_rate').val();
        if(aff_rate == '')
        {
            $("#aff_rate").focus();
            showMsg("Vui lòng nhập tỉ lệ cho Affiliate!");
            return false;
        }
        else{
            $("#message_show").html('');
        }
        if(aff_rate && (aff_rate < 10 || aff_rate >100))
        {
            $("#aff_rate").focus();
            showMsg("Tỉ lệ Aff phải lớn hơn 10 và nhỏ hơn 100%, vui lòng kiểm tra lại!");
            return false;
        }
        else{
            $("#message_show").html('');
        }
        if(sale_rate == '')
        {
            $("#sale_rate").focus();
            showMsg("Vui lòng nhập tỉ lệ cho Sale!");
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
    });
    $(document).on("click", "#layout_footer_edit", function() {
        $('#layout_footer_modal').modal().show();
    });

});