$(document).ready(function(){
    $('#shop_submit').click(function(e) {
        var shop_name = $('#shop_name').val();
        var shop_biz_group_id = $('#shop_biz_group_id').val();
        var shop_website = $('#shop_website').val();
        var logo_size = document.getElementById('shop_logo').files[0];
        var shop_email = $('#shop_email').val();
        var shop_phone = $('#shop_phone').val();
        var cookie_time = $('#shop_cookie_time').val();
        if(shop_name == '')
        {
            $("#shop_name").focus();
            showMsg("Bạn chưa nhập tên Shop, vui lòng kiểm tra lại!");
            return false;
        }
        else{
            $("#message_show").html('');
        }
        if(shop_biz_group_id == '')
        {
            $("#shop_biz_group_id").focus();
            showMsg("Bạn chưa chọn lĩnh vực kinh doanh, vui lòng kiểm tra lại!");
            return false;
        }
        else{
            $("#message_show").html('');
        }
        // kiểm tra thông tin website
        if(shop_website == '')
        {
            $("#shop_website").focus();
            showMsg("Bạn chưa nhập thông tin Website, vui lòng kiểm tra lại!");
            return false;
        }
        else{
            $("#message_show").html('');
        }
        if(!checkIsValidDomain(shop_website) && shop_website != '')
        {
            $("#shop_website").focus();
            showMsg("Lỗi! Sai định dạng Website, vui lòng thử lại!");
            return false;
        }
        else{
            $("#message_show").html('');
        }
        /*if(shop_website != '') {
            var website_check_return = jQuery.parseJSON(JSON.stringify(
                jQuery.ajax({
                    url: BASE_URL + "globalaction/check_website?shop_id=" + shop_id + "&website=" + shop_website,
                    async: false,
                    dataType: 'json'
                }).responseText
            ));
            var data_return = JSON.parse(website_check_return);
            if(data_return.error)
            {
                $("#shop_website").focus();
                showMsg(data_return.msg);
                return false;
            }
        }*/
        // hết kiểm tra website
        if(typeof logo_size != 'undefined')
        {
            if(!validateImage(document.getElementById('shop_logo')))
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
        if(cookie_time !='' && cookie_time < 30)
        {
            $("#cookie_time").focus();
            showMsg("Thời gian lưu Cookie phải lớn hơn hoặc bằng 30 ngày, vui lòng kiểm tra lại!");
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
					url: BASE_URL + 'merchant/category_source_delete/'+ id,
					data: "ajax",
					async: true,
					success: function(kq){
						parent_tr.slideUp("slow");
					}
				})
			};
		});
	});
		
	$(document).on("click", "#merchant_category_source_import", function() {
		var category_file = $("#category_file").val();
		var category_file_view = $("#category_file_view").text();
		if(category_file == '')
		{
			$("#category_file").focus();
			showMsgPop('Vui lòng chọn File!');
			return false;
		}
		else{
			$("#message_pop_show").html('');
		}
		$.ajax({
			url: BASE_URL + 'merchant/import_category_source?category_file_view=' + category_file_view,
			type: "post",
			dateType: "text",
			success: function (response) {
				if(category_file !=''){
					if(!response.error){
						setTimeout(function() {showMsgPop(response.msg,'success');}, 2);
						location.reload();
					}
					else
						showMsgPop(response.msg);
				}
			}
		});
	});

    if($('#elemId').length){
        document.getElementById('category_file').addEventListener('change', upload_csv, false);
    }

    function upload_csv(evt) {
        if (!browserSupportFileUpload()) {
		alert('Trình duyệt không hỗ trợ tính năng này!');
		} else {
			var data = null;
			var file = evt.target.files[0];
			var reader = new FileReader();
			reader.readAsText(file);
			reader.onload = function(e) {
				var rows = e.target.result.split("\r\n");
				var first_Row_Cells = splitCSVtoCells(rows[0], ";"); //Taking Headings
				var jsonArray = new Array();
				for(var i=1;i<rows.length;i++)
				{
					var cells = splitCSVtoCells(rows[i], ";");
					var obj = {};
					for(var j=0;j<cells.length;j++)
					{
						obj[first_Row_Cells[j]] = cells[j];
					}
					jsonArray.push(obj);
				}
				document.getElementById('category_file_view').innerHTML = JSON.stringify(jsonArray);
			};
			reader.onerror = function() {
				alert('Đọc không thành công file ' + file.fileName);
			};
		}
	}

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
});