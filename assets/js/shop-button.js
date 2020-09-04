$(document).ready(function(){
    $(document).on("click", ".button_set_image", function() {
        $("#button_code").val($(this).attr('button_url'));
        $('#myModal').modal('toggle');
    });
    $(document).on("click", "#view_form_button", function() {
        if($(this).text() == 'Ẩn form')
        {
            $(this).text('Xem form');
        }
        else
        {
            $(this).text('Ẩn form');
        }
        $(".form-display").slideToggle();
    });
    $(document).on("click", "#button_image", function() {
        $.ajax({
            type: "POST",
            url: BASE_URL + 'shop/chosen_button',
            data: "ajax",
            async: true,
            success: function(response){
                if(!response.error){
                    $('#myModal').html(response.html);
                    $('#myModal').modal();
                }
                else
                    showMsg(response.msg);
            }
        })
    });
    $(document).on("click", "#button_image_create", function() {
        var is_quantitized;
        var button_code = $('#button_code').val();
        if(button_code == ''){
            $("#button_code").focus();
            showMsg("Bạn chưa chọn button!");
            return false;
        }else{
            $("#message_show").html('');
        }
        if ($('#is_quantitized').is(":checked"))
        {
            is_quantitized = 1;
        }
        else{
            is_quantitized = 0;
        }
        if(!$('select#form_product_id').val()){
            form_product_id = '';
        }else{
            form_product_id = $('select#form_product_id').val();
        }
        $.ajax({
            type: "POST",
            url: BASE_URL + 'shop/ajaxUpdateShopEmbedCode?id='+ button_id +'&shop_id='+ shop_id + '&button_code=' + button_code + '&form_code=' + encodeURIComponent($("#render-code").val()) + '&product_ids=' + form_product_id + '&is_quantitized=' + is_quantitized + '&thank_you_url=' + encodeURIComponent($("#thank_you_url").val()) + '&cancel_url=' + encodeURIComponent($("#cancel_url").val()) + '&landing_url=' + encodeURIComponent($("#landing_url").val()),
            data: "ajax",
            async: true,
            success: function(response){
                var json_data = JSON.parse(response.data);
                console.log(json_data);
                //location.href = BASE_URL + 'shop/create/'+ shop_id +'/embed-code';
                location.href = BASE_URL + 'embed-code/add/'+ json_data.button_id;
            }
        })
    });
});