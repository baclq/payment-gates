$('body').on('click', '#user_btn_find', function () {
    var key_work = $('#key_word_add_user').val();
    var role_id = $('.add-role').val();
    if(key_work==''){
        alert('Vui lòng nhập email');
        return false;
    }
    if(role_id==''){
        alert('Vui lòng chọn quyền');
        return false;
    }
    if (key_work != '' && role_id!='') {
        $.ajax({
            url: BASE_URL + "/shop/ajaxFindUser?email=" + key_work + "&role_id=" + role_id,
            type: "get",
            dateType: "text",
            async: false,
            success: function (result) {
                $('.user-found').html(result);
            }
        });
    }
});
$('body').on('change', '.chosen-select', function () {
    var role_id = $(this).val();
    if(role_id==31){
        $('.cd-popup').addClass('is-visible');
        //alert('Quyền này sẽ thay đổi chủ sở hửu shop, vui lòng cân nhắc trước khi thay đổi.');
    }
});
$('body').on('click', '.confirm-role', function () {
    $('.cd-popup').removeClass('is-visible');
});
$('body').on('click', '.cancel-role', function () {
    $(".chosen-select").each(function() { this.selectedIndex = 0 });
    $('.cd-popup').removeClass('is-visible');
});
$('body').on('click', '.edit-role', function () {
    var email = $(this).data('email');
    var curent_role = $(this).parent().parent().parent().find('.curent-role').data('role');
    $('#key_word_add_user').val(email);
    $('.add-role').val(curent_role);
    $('#user_btn_find').html('Cập nhật');
});
$('body').on('change', '#shop_user_role', function () {
    var id = $(this).data('id');
    var role_id = $(this).val();
    $.ajax({
        url: BASE_URL + "/shop/editRole",
        type: "POST",
        data: {id: id,role_id:role_id},
        cache:false,
        dataType: 'html',
        success: function (result) {
            if(result==1){
                $('.success-role').removeClass('hidden');
            }else{
                $('.success-role').removeClass('alert-success');
                $('.success-role').addClass('alert-error');
                $('.success-role').removeClass('hidden');
            }
        }
    });
});
$('#user_display_ajax').on('click', '.shop_user_add', function () {
    var role = $('.add-role').val();
    var user_id = $(this).attr('rel');
    var email = $(this).data('mail');
    if (role > 0 && user_id > 0) {
        window.location.href = BASE_URL + '/Shop/addUserShop?user_id=' + user_id + '&role=' + role + '&email=' + email;
    }
});

$(document).ready(function($){
    //open popup
    $('.cd-popup-trigger').on('click', function(event){
        event.preventDefault();
        $('.cd-popup').addClass('is-visible');
    });
    
    //close popup
    $('.cd-popup').on('click', function(event){
        if( $(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup') ) {
            event.preventDefault();
            $(this).removeClass('is-visible');
        }
    });
    //close popup when clicking the esc keyboard button
    $(document).keyup(function(event){
        if(event.which=='27'){
            $('.cd-popup').removeClass('is-visible');
        }
    });
});
