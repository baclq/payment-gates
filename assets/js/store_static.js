$(document).ready(function(){
    $(".shop-select #shop_id").change(function(){
        var shop_id = $(this).val();
        $.ajax({
            type: "GET",
            url: BASE_URL + 'store/ajax_change_shop?shop_id='+shop_id,
            data: "ajax",
            async: true,
            success: function(data){
                $("#show_fitter").html(data);
                $('#date-select').datetimepicker(
                    {
                        viewMode: 'years',
                        format: 'MM/YYYY'
                    }
                    );
            }
        })
    });
});

$(document).ready(function(){
    $(document).on("click", "#fitter-result", function() {
        var shop_id = $('#shop_id').val();
        var store_id = $('#store_id').val();
        var category = $('#category').val();
        var date = $('#date-select').val();
        if(shop_id == '')
        {
            $("#shop_id").focus();
            showMsg("Vui lòng chọn shop!");
            return false;
        }
        else{
            $("#message_show").html('');
        }
        if(store_id == '')
        {
            $("#store_id").focus();
            showMsg("Vui lòng chọn kho!");
            return false;
        }
        else{
            $("#message_show").html('');
        }
        if(category == '')
        {
            $("#category").focus();
            showMsg("Vui lòng chọn kho!");
            return false;
        }
        else{
            $("#message_show").html('');
        }
        if(date == '')
        {
            $("#date-select").focus();
            showMsg("Vui lòng chọn tháng!");
            return false;
        }
        else{
            $("#message_show").html('');
        }

        $.ajax({
            type: "GET",
            url: BASE_URL + 'store/ajax_product_check?shop_id='+shop_id+'&store_id='+store_id+
                '&category='+category+'&date='+date,
            data: "ajax",
            async: true,
            success: function(data){
                $("#show-result").html(data);
                var table = $('#dynamic-table').DataTable({"pageLength": 20});
            }
        })
    });
});
