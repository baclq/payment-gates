$(document).ready(function(){
    $(document).on("click", "#layout_banner_active", function() {
        if($(this).text() == 'Ẩn')
        {
            $(this).text('Hiện');
            var banner_active = 2;
        }
        else
        {
            $(this).text('Ẩn');
            var banner_active = 1;
        }
		$(".shop-banner-logo-display").slideToggle();
        $.ajax({
            type: "POST",
            url: BASE_URL + 'shop/banner_active',
            data: {"shop_id":shop_id, "banner_active":banner_active},
            async: true,
            success: function(response){
                console.log(response);
            }
        })
    });
});