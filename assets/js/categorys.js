$(document).ready(function(){
	$("#partner_chosen_ajax").change(function(){
		var id = $(this).val();
		$.ajax({
			type: "POST",
			url: BASE_URL + 'shop/get_shop_by_partner?id='+ id,
			data: "ajax",
			async: true,
			success: function(response){
                if(response){
                    $("#partner_shop_ajax").html(response);
                }
			}
		});
	});
});