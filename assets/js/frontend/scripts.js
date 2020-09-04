function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#vender_shop_image').val(e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}
$( window ).load(function() {
    var hash = window.location.hash;
    if (hash == "#register") {
        var top = document.getElementById("register").offsetTop;
        window.scrollTo(0, top);
    }
});
function checkusername(username) {
    var regex = /^[a-zA-Z0-9]{3,20}$/;
    return regex.test(username);
}
$(document).ready(function(){
    tinymce.init({ selector:'textarea#vendor_shop_description', menubar: false, statusbar: false});
    $("#vendor_home_register").on("click", function() {
        var aff_username = $("#aff_username").val();
        var vendor_shop_websiste = $("#vendor_shop_websiste").val();
        var vendor_shop_biz_group = $("#vendor_shop_biz_group").val();
        var vendor_shop_name = $("#vendor_shop_name").val();
        var vendor_shop_address = $("#vendor_shop_address").val();
        var vendor_shop_mobile = $("#vendor_shop_mobile").val();
        var vendor_shop_email = $("#vendor_shop_email").val();
        var vendor_shop_make_sale = $('input[name=vendor_make_sale]:checked', '#vendor_register').val();
        var vendor_shop_description = $("#vendor_shop_description").val();

        if(aff_username == ''){
            $("#aff_username").focus();
            alert("Vui lòng Username!");
            return false;
        }
        if(checkusername(aff_username)==false){
            alert('username phải từ 4 đến 20 ký tự viết liền không dấu, không chứa các ký tự đặc biệt!');
            return false;
        }
        var username_rt = jQuery.parseJSON(JSON.stringify(
            jQuery.ajax({
                url: BASE_URL + "globalaction/check_username?user_name=" + aff_username,
                async: false,
                dataType: 'json'
            }).responseText
        ));
        var data_return = JSON.parse(username_rt);  
        if(data_return.error){
            $("#aff_username").focus();
            alert(data_return.msg);
            return false;
        }

        if(vendor_shop_name == ''){
            $("#vendor_shop_name").focus();
            alert("Vui lòng nhập tên Shop!");
            return false;
        }
        if(vendor_shop_name.length <4 || vendor_shop_name.length > 155){
            $("#vendor_shop_name").focus();
            alert("Tên Shop phải lớn hơn 4 và nhỏ hơn 155 ký tự!");
            return false;
        }
        if(vendor_shop_biz_group == ''){
            $("#vendor_shop_biz_group").focus();
            alert("Vui lòng chọn lĩnh vực kinh doanh!")
            return false;
        }

        if(vendor_shop_websiste == ''){
            $("#vendor_shop_websiste").focus();
            alert("Vui lòng nhập Website!");
            return false;
        }
        if(!checkIsValidDomain(vendor_shop_websiste) && vendor_shop_websiste != '')
        {
            $("#vendor_shop_websiste").focus();
            alert("Sai định dạng Website, vui lòng thử lại!");
            return false;
        }
        /*if(vendor_shop_websiste != '') {
           var website_check_return = jQuery.parseJSON(JSON.stringify(
               jQuery.ajax({
                   url: BASE_URL + "globalaction/check_website?website=" + vendor_shop_websiste,
                   async: false,
                   dataType: 'json'
               }).responseText
           ));
           var data_return = JSON.parse(website_check_return);
           if(data_return.error)
           {
               $("#vendor_shop_websiste").focus();
               alert(data_return.msg);
               return false;
           }
        }*/
        if(vendor_shop_mobile == ''){
            $("#vendor_shop_mobile").focus();
            alert("Vui lòng nhập số điện thoại!");
            return false;
        }
        if(vendor_shop_mobile !='' && !validatePhone(vendor_shop_mobile)){
            $("#vendor_shop_mobile").focus();
            alert("Sai định dạng số điện thoại!");
            return false;
        }
        if(vendor_shop_email == ''){
            $("#vendor_shop_email").focus();
            alert("Vui lòng nhập Email!");
            return false;
        }
        if(vendor_shop_email !='' && !isValidEmailAddress(vendor_shop_email)){
            $("#vendor_shop_email").focus();
            alert("Sai định dạng Email!");
            return false;
        }
        if ($('#make_sale').is(":checked"))
        {
            var make_sale = 1;
        }
        else{
            var make_sale = 0;
        }
        if ($('#free_ship').is(":checked"))
        {
            var free_ship = 1;
        }
        else{
            var free_ship = 0;
        }
        $.ajax({
            type: "POST",
            url: BASE_URL + 'globalaction/vendor_register?website=' + vendor_shop_websiste + '&biz_group_id=' + vendor_shop_biz_group + '&name=' + vendor_shop_name + '&address=' + vendor_shop_address + '&phone=' + vendor_shop_mobile + '&email=' + vendor_shop_email + '&make_sale=' + make_sale + '&free_ship=' + free_ship + '&description=' + vendor_shop_description + '&username=' + aff_username,
            async: true,
            success: function(response){
            if(response.register_link){
                location.href = response.register_link;
            }
        }
    });
});

});

var target = window.location.hash,
    target = target.replace('#', '');

// delete hash so the page won't scroll to it
window.location.hash = "";

// now whenever you are ready do whatever you want
// (in this case I use jQuery to scroll to the tag after the page has loaded)
$(window).load(function() {
    if (target) {
        $('html, body').animate({
            scrollTop: $("#" + target).offset().top
        }, 1200, 'swing', function () {});
    }
});