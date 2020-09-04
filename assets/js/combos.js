$(document).ready(function(){
    $(document).on("change", "#combos_change_status", function() {
        var id = $(this).attr('rel');
        var status = $(this).val();
        $.ajax({
            type: "POST",
            url: BASE_URL + 'combo/combo_change_status',
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
});