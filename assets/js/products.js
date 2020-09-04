$(document).ready(function(){
	$("#shop_id_ajax").change(function(){
		var id = $(this).val();
		$.ajax({
			type: "POST",
			url: BASE_URL + 'shop/get_shop_category/'+ id,
			data: "ajax",
			async: true,
			success: function(data){
				$("#shop_category_ajax").html(data);
			}
		})
	});

    $(document).on("click", ".product_submit", function() {
        var product_source_id = $('#product_source_id').val();
        var product_name = $('#product_name').val();
        var product_cate = $('#shop_category_ajax').val();
        //var price_original = $('#price_original').val();//giá vốn
        var unit_price = $('#unit_price').val(); //giá gốc
        var price_sale = $('#price_sale').val(); //giá bán
        var weight = $('#weight').val();

        //var product_landing_url = $('#product_landing_url').val();
        if(product_name == '')
        {
            $("#product_name").focus();
            showMsg("Vui lòng nhập tên sản phẩm!");
            return false;
        }        

        if(shop_type == 1){
            if(weight == '')
            {
                $("#weight").focus();
                showMsg("Vui lòng nhập trọng lượng sản phẩm!");
                return false;
            }
        }
        if(unit_price == '')
        {
            $("#unit_price").focus();
            showMsg("Vui lòng nhập giá gốc sản phẩm!");
            return false;
        }

        if(price_sale == '')
        {
            $("#price_sale").focus();
            showMsg("Vui lòng nhập giá bán sản phẩm!");
            return false;
        }


    });

    $(document).on("click", ".j_product_child", function() {
        var id = $(this).attr('data-id');//alert(id);

        $.ajax({
            type: "POST",
            url: BASE_URL + 'product/ajaxGetProductGroup',
            data: {id:id},
            success: function(data){//alert(id);
                var tabTop = '<table class="table table-striped table-bordered"><tbody>';
                var tabBottom = '</tbody></table>';
            $('#show_product_child'+id).html(tabTop+data+tabBottom);
                $('.vertical_ajax').lightSlider({
                  gallery:true,
                  item:1,
                  vertical:true,
                  verticalHeight:155,
                  vThumbWidth:50,
                  thumbItem:4,
                  thumbMargin:4,
                  slideMargin:0
                });

                $(function() {
                    $('.click_advance').on('click', function() {
                    $(this).find('i').toggleClass('fa-chevron-circle-down fa-chevron-circle-up');
                   });
                });
            }

        });
    });

    $(document).on("click", "#product_group_search", function() {
        var key_search = $('#key_search').val();
        var shop_id = $('#shop_id').val();
        var id = $('#ps_id').val();
        if(key_search == '')
        {
            $("#key_search").focus();
            showMsg("không được để trống từ khóa tìm kiếm!");
            return false;
        }
        $.ajax({
            type: "POST",
            url: BASE_URL + 'product/product_group_search',
            data: {key_search:key_search, shop_id:shop_id,id:id},
            success: function(data){
                $('#product_group_show').html(data);
            }

        });
    });


    $(document).on("click", ".j_product_the_kho", function() {
        var id = $(this).attr('data-id');//alert(id);

        $.ajax({
            type: "POST",
            url: BASE_URL + 'product/ajax_the_kho',
            data: {id:id},
            success: function(data){//alert(id);
                $('#show_the_kho'+id).html(data);
            }

        });
    });
/*
    $(document).on("click", ".j_product_ton_kho", function() {
        var id = $(this).attr('data-id');//alert(id);

        $.ajax({
            type: "POST",
            url: BASE_URL + 'product/ajax_ton_kho',
            data: {id:id},
            success: function(data){//alert(id);
                $('#show_ton_kho'+id).html(data);


            }

        });
    });
*/


    $(document).on("click", ".click-ton-kho", function() {
        var id = $(this).attr('data-click-id');
        $('#drop-product'+id).click();
        $.ajax({
            type: "POST",
            url: BASE_URL + 'product/ajax_ton_kho',
            data: {id:id},
            success: function(data){//alert(id);
                $('#drop-product'+id).click();
                $('#show_ton_kho'+id).html(data);
            }

        });
    });


	$(document).on("click", "#product_submit", function() {
		//var logo_size = document.getElementById('product_logo').files[0];
        var product_source_id = $('#product_source_id').val();
        var product_name = $('#product_name').val();
        //var product_landing_url = $('#product_landing_url').val();
        if(product_name == '')
        {
            $("#product_name").focus();
            showMsg("Vui lòng nhập tên sản phẩm!");
            return false;
        }
        else{
            $("#message_show").html('');
        }

        if(typeof logo_size !== "undefined"){
            if(logo_size.size > 100000)
            {
                $("#product_logo").focus();
                showMsg("Ảnh upload vượt quá kích thước cho phép 100kb, vui lòng kiểm tra lại!");
                return false;
            }
            else{
                $("#message_show").html('');
            }
        }
        var data = jQuery.parseJSON(
            jQuery.ajax({
                url: BASE_URL + 'product/check_product_code?id='+ product_id + '&product_code='+product_source_id,
                async: false,
                dataType: 'json'
            }).responseText
        );
        if(data.error)
        {
            $("#product_source_id").focus();
            showMsg(data.msg);
            return false;
        }
        else{
            $("#message_show").html('');
        }
	});

    $(document).on("change", "#product_change_status", function() {
        var id = $(this).attr('rel');
        var status = $(this).val();
        $.ajax({
            type: "POST",
            url: BASE_URL + 'product/product_change_status',
            data: {id:id, status:status},
            async: true,
            success: function(response){
                if(!response.error){
                    showMsg(response.msg,'success');

                }
                else
                    showMsg(response.msg);
            }
        });
    });

        $(document).on("click", ".product_delete", function() {
        var id = $(this).attr('data-id');
        //var status = $(this).val();
        $.ajax({
            type: "POST",
            url: BASE_URL + 'product/product_delete',
            data: {id:id},
            success: function(response){
                if(!response.error){
                    //showMsg(response.msg,'success');
                    $('table .product-'+id).remove();

                }
                else
                    showMsg(response.msg);
            }
        });
    });

	$(document).on("change", "#aff_type_ajax", function() {
		var aff_type = $(this).val()
        if(aff_type == 'CPL' || aff_type == 'CPO') {
			$('#rate_label').html("Aff Money");
			$('#rate_label_span').html("đ");
			$('#aff_money_ajax').show();
			$('#aff_rate_ajax').hide();
			$('#rate_percent').hide();
			$('#rate_vnd').show();
        } else {
			$('#rate_label').html("Aff Rate");
			$('#rate_label_span').html("%");
            $('#aff_rate_ajax').show();
			$('#aff_money_ajax').hide();
			$('#rate_percent').show();
			$('#rate_vnd').show();
        }
    });

	$(document).on("click", "#product_rate_submit", function() {
		var product_id = $(this).attr("rel");
		var aff_type = $("#aff_type_ajax").val();
		var aff_rate = $("#aff_rate").val();
		if(aff_rate <= 0)
		{
			$("#aff_rate").focus();
			$("#popup_msg").text("Giá trị hoa hồng phải lớn hơn 0!");
			$("#popup_show_msg").show();
			return false;
		}else{
			$("#aff_rate").blur();
			$("#popup_msg").text("");
			$("#popup_show_msg").hide();
		}
		if(aff_type == 'CPS') {
			if($('input[name=aff_rate]:checked', '#popup_form').val() == 'rate_vnd'){
				if(aff_rate < 10000){
					$("#aff_rate").focus();
					$("#popup_msg").text("Tiền hoa hồng phải lớn hơn 10.000 đ!");
					$("#popup_show_msg").show();
					return false;
				}
				else{
					$("#aff_rate").blur();
					$("#popup_msg").text("");
					$("#popup_show_msg").hide();
				}
			}else{
				if(aff_rate >= 100 || aff_rate <5){
					$("#aff_rate").focus();
					$("#popup_msg").text("Tỷ lệ hoa hồng phải lớn hơn 5 và nhỏ hơn hoặc bằng 100!");
					$("#popup_show_msg").show();
					return false;
				}else{
					$("#aff_rate").blur();
					$("#popup_msg").text("");
					$("#popup_show_msg").hide();
				}
			}
		}
		$.ajax({
			type: "POST",
			url: BASE_URL + 'product/update_product_propose?product_id='+ product_id + '&aff_type='+ aff_type + '&aff_rate='+ aff_rate,
			data: "ajax",
			async: true,
			success: function(kq){
				if(kq){
					alert("Cập nhật thành công!");

				}
			}
		});
	});



        $("#importForm").on('submit',(function(e){
            e.preventDefault();
            var market_cate_id = $('#market_cate_id').val();
            if (market_cate_id == '') {
                alert('Vui lòng chọn danh mục');
                return false;
            }

                $.ajax({
                url:BASE_URL + 'product/import',
                type: "POST",
                data:  new FormData(this),
                contentType: false,
                cache: false,
                processData:false,
                beforeSend: function() {
                    $(".uploading").show();
                },
                success: function(data){
                    $('.uploading').hide();
                    $("#importModal").modal("hide");
                    alert(data);
                    location.reload();
                },
                error: function(){
                    alert(data);
                }
            });
        }));




//Make script DOM ready
    $('.att-select').on('change',function() { //jQuery Change Function
        var opval = $(this).val(); //Get value from select element
        if(opval=="checkAddAttributes"){
            $(this).addClass("att-select-active");
            $('#attModal').modal("show"); //Open Modal
        }
    });


//Make script DOM ready
    $('#attModal').on('click', '#btn-att-add', function() {
        var attAdd = $("#att-add").val();
        if(attAdd !== ''){ //Compare it and if true
            $('#attModal').modal("hide"); //close Modal
            $('.att-select-active').append('<option value="'+attAdd+'" selected>'+attAdd+'<option>');
            $('select').removeClass('att-select-active');
            $('.att-select option').filter(function() {
                        return !this.value || $.trim(this.value).length == 0 || $.trim(this.text).length == 0;
                    })
                   .remove();
        }
    });

        $(function() {
            $('.product_js a').click(function() {
                $(this).find('i').toggleClass('fa-chevron-circle-down fa-chevron-circle-up');

            });
        });


 });

