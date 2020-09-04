 $(document).ready(function(){
    $('.btn_upload_image').click(function(){
        $('#hidden_file').click();

    });

    $('#hidden_file').change(function(){
        var file_data = $(this).prop('files')[0];
        var form_data = new FormData();
        form_data.append('file', file_data);
        var url = $(this).attr('data-url');
        console.log(form_data);
        $.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            data: form_data,
            cache: false,
            contentType: false,
            processData: false,
            success: function(res){
                if(res.success){
                    //$('.input_images').val(res.images);
                    $('#show_image_box').append(res.images);
                    var img_count =  $("#show_image_box img").length;
                    //alert(img_count);
                }else{
                    //$('.show_image_box').html('<div class="form-group"><label class="label label-danger">Ảnh lỗi, vui lòng nhập lại ảnh khác</label></div>');
                    alert(res.message);
                }
            },
            error: function(res){
                alert(res.message);
            }
        });
    });
});

 $(document).ready(function(){
    $('#show_image_box').on('click', '.btn-imgdel', function() {
        //alert('chrisle');
        var url = $(this).attr('data-url');
        var rfile = $(this).attr('data-id');
        $.ajax({
            url : url,
            type : 'POST',
            dataType :'json',
            cache : false,
            data: {'rfile':rfile},
            success:function(res){
                //alert(res.idImage);
                $("."+res.idImage).remove();
                var img_count =  $("#show_image_box img").length;
                    //alert(img_count);
            },
            error:function(res){
                alert(' delete error');
            }
        });

    });
});





