$(document).ready(function(){
	$(".bootbox-confirm").on(ace.click_event, function() {
		var id = $(this).attr("rel");
		var role_id = $(this).attr("role");
		var parent_tr = $(this).parents('tr');
		bootbox.confirm("Bạn có chắc chắn xoá?", function(result) {
			if(result) {
				$.ajax({
					type: "POST",
					url: BASE_URL + 'vendor/vendor_user_delete?role_id='+ role_id +'&user_id='+ id,
					data: "ajax",
					async: true,
					success: function(kq){
						parent_tr.slideUp("slow");
					}
				})
			};
		});
	});
	$(".bootbox-confirm-owner").on(ace.click_event, function() {
		var id = $(this).attr("rel");
		var role_id = $(this).attr("role");
		var parent_tr = $(this).parents('tr');
		bootbox.confirm("Bạn có chắc chắn xoá?", function(result) {
			if(result) {
				$.ajax({
					type: "POST",
					url: BASE_URL + 'vendor/vendor_user_delete?role_id='+ role_id +'&vendor_id='+ id,
					data: "ajax",
					async: true,
					success: function(kq){
						parent_tr.slideUp("slow");
					}
				})
			};
		});
	});
	$(".transfer-confirm").on(ace.click_event, function() {
		var vendor_id = $(this).attr("rel");
		var role_id = $(this).attr("role");
		bootbox.confirm("Bạn có chắc chắn chuyển sang sử dụng quyền của Vendor này?", function(result) {
			if(result) {
				$.ajax({
					type: "POST",
					url: BASE_URL + 'vendor/transfer_vendor_user?vendor_id=' + vendor_id + '&role_id=' + role_id,
					data: "ajax",
					async: true,
					success: function(kq){
						location.reload();
					}
				})
			};
		});
	});
	$("#user_btn_find").click(function(){
		var key_word = $("#key_word_add_user").val();
		if(key_word != ''){
			$.ajax({
				type: "POST",
				url: BASE_URL + 'user/user_search_ajax/?key_word='+ encodeURI(key_word),
				data: "ajax",
				async: true,
				success: function(kq){
					$("#user_display_ajax").html(kq);
				}
			})
		}
	});
	$(document).on("click", ".vendor_user_add", function() {
		var user_id = $(this).attr('rel');
		var role_id = $("#vendor_user_role").val();
		$.ajax({
			type: "POST",
			url: BASE_URL + 'vendor/vendor_user_ajax/?role_id='+ role_id +'&user_id='+ user_id,
			data: "ajax",
			async: true,
			success: function(kq){
				if(kq > 0){
					alert('Cập nhật thành công!');
					location.reload();
				}else{
					alert('User đã tồn tại vai trò này trong Vendor của bạn, vui lòng kiểm tra lại!');
				}
			}
		})
	});
});