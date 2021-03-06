function ajaxSearch() {
    var url_params = location.protocol + '//' + location.host + location.pathname + '?month_filter=' + $("#month_filter").val() + '&year_filter=' + $("#year_filter").val();
    location.href = url_params;
}
$(document).ready(function(){
    $("#payment_order_file").on("change", function () {
        var excelFile,
            fileReader = new FileReader();
        fileReader.onload = function (e) {
            var buffer = new Uint8Array(fileReader.result);

            $.ig.excel.Workbook.load(buffer, function (workbook) {
                var column, row, newRow, cellValue, columnIndex, i,
                    worksheet = workbook.worksheets(0),
                    columnsNumber = 0,
                    gridColumns = [],
                    data = [],
                    worksheetRowsCount;

                while (worksheet.rows(0).getCellValue(columnsNumber)) {
                    columnsNumber++;
                }

                // Iterating through cells in first row and use the cell text as key and header text for the grid columns
                for (columnIndex = 0; columnIndex < columnsNumber; columnIndex++) {
                    column = worksheet.rows(0).getCellText(columnIndex);
                    gridColumns.push({ headerText: column, key: column });
                }

                // We start iterating from 1, because we already read the first row to build the gridColumns array above
                // We use each cell value and add it to json array, which will be used as dataSource for the grid
                for (i = 1, worksheetRowsCount = worksheet.rows().count() ; i < worksheetRowsCount; i++) {
                    newRow = {};
                    row = worksheet.rows(i);

                    for (columnIndex = 0; columnIndex < columnsNumber; columnIndex++) {
                        cellValue = row.getCellText(columnIndex);
                        newRow[gridColumns[columnIndex].key] = cellValue;
                    }

                    data.push(newRow);
                }
                document.getElementById('payment_order_file_view').innerHTML = JSON.stringify(data);
            }, function (error) {
            });
        }

        if (this.files.length > 0) {
            excelFile = this.files[0];
            if (excelFile.type === "application/vnd.ms-excel" || excelFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || (excelFile.type === "" && (excelFile.name.endsWith("xls") || excelFile.name.endsWith("xlsx")))) {
                fileReader.readAsArrayBuffer(excelFile);
            } else {
                $("#result").text("The format of the file you have selected is not supported. Please select a valid Excel file ('.xls, *.xlsx').");
                $("#result").show(1000);
            }
        }
    });

    $(".receipt_active").on(ace.click_event, function() {
        var id = $(this).attr("rel");
        var parent_tr = $(this).parents('tr');
        bootbox.confirm("Bạn có chắc chắn duyệt phiếu thu này?", function(result) {
            if(result) {
                $.ajax({
                    type: "POST",
                    url: BASE_URL + 'revenue/activePayment/'+ id,
                    data: "ajax",
                    async: true,
                    success: function(kq){
                        if($(".td_active"+id).length){
                            $(".td_active"+id).html("<span class='label label-xs label-success'>Đã duyệt</span>");
                            $(".td_action"+id).find(".payment_edit_button").remove();
                        }
                        else{
                            location.reload();
                        }

                    }
                })
            };
        });
    });
    $(".receipt_out_active").on(ace.click_event, function() {
        var id = $(this).attr("rel");
        bootbox.confirm("Bạn có chắc chắn duyệt phiếu Chi này?", function(result) {
            if(result) {
                $.ajax({
                    type: "POST",
                    url: BASE_URL + 'revenue/activePaymentOut',
                    data: {id:id},
                    async: true,
                    success: function(response){
                        if(!response.error){
                            alert(response.msg);
                            location.reload();
                        }
                        else{
                            alert(response.msg);
                        }

                    }
                })
            };
        });
    });
    $(".receipt_charge_active").on(ace.click_event, function() {
        var id = $(this).attr("rel");
        bootbox.confirm("Bạn có chắc chắn duyệt phiếu nạp tiền này?", function(result) {
            if(result) {
                $.ajax({
                    type: "POST",
                    url: BASE_URL + 'payment/activePaymentCharge',
                    data: {id:id},
                    async: true,
                    success: function(response){
                        if(!response.error){
                            alert(response.msg);
                            location.reload();
                        }
                        else{
                            alert(response.msg);
                        }

                    }
                })
            };
        });
    });
    $(".payment_mail_send").on(ace.click_event, function() {
        var id = $(this).attr("rel");
        bootbox.confirm("Bạn có chắc chắn gửi mail thanh toán đến các User trong phiếu chi này?", function(result) {
            if(result) {
                $.ajax({
                    type: "POST",
                    url: BASE_URL + 'payment/sendMailPaymentOut',
                    data: {id:id},
                    async: true,
                    success: function(response){
                        if(!response.error){
                            alert(response.msg)
                            location.reload();
                        }
                        else{
                            alert(response.msg)
                        }
                    }
                })
            };
        });
    });
    $("#payment_order_display .order_id").on(ace.click_event, function() {
        var order_id = $(this).parent().closest('tr').attr('id');
        window.open(BASE_URL + 'order/order_edit/' + order_id);
    });
    $(".bootbox-confirm").on(ace.click_event, function() {
        var id = $(this).attr("rel");
        var parent_tr = $(this).parents('tr');
        bootbox.confirm("Bạn có chắc chắn xoá?", function(result) {
            if(result) {
                $.ajax({
                    type: "POST",
                    url: BASE_URL + 'revenue/deletePayment/'+ id,
                    data: "ajax",
                    async: true,
                    success: function(kq){
                        parent_tr.slideUp("slow");
                    }
                })
            };
        });
    });
    $(document).on("click", "#payment_order_actual_receive_button", function() {
        var order_id = $("#payment_order_id_update").val();
        var required_pay = $("#payment_order_id_value_update").val();
        var payment_fee = $("#payment_order_id_fee_update").val();
        if(order_id == '')
        {
            $("#payment_order_id_update").focus();
            showMsgPop('Vui lòng nhập mã đơn!');
            return false;
        }
        else{
            $("#message_pop_show").html('');
        }
        if(required_pay == ''){
            required_pay = 0;
        }
        if(payment_fee == ''){
            payment_fee = 0;
        }
        var json_string = '[{"order_id":'+ order_id +',"required_pay":'+ required_pay +'}]';
        $.ajax({
            url: BASE_URL + 'revenue/order_actual_receive?payment_order_file_view=' + json_string,
            type: "post",
            dateType: "text",
            success: function (response) {
                if(payment_order_file !=''){
                    if(!response.error){
                        location.reload();
                    }
                    else
                        showMsgPop(response.msg);
                }
            }
        });
    });
    // phiếu thu - Tách đơn
    $(document).on("click", "#payment_created_order_button", function() {
        var order_id = $("#c_order_id").val();
        var revenue = $("#c_revenue").val();
        if(order_id == '')
        {
            $("#c_order_id").focus();
            showMsg('Vui lòng nhập mã đơn!');
            return false;
        }
        else{
            $("#message_pop_show").html('');
        }
        $.ajax({
            url: BASE_URL + 'revenue/create_order_ajax',
            type: "POST",
            data: {order_id:order_id, revenue:revenue},
            dateType: "text",
            success: function (response) {
                if(!response.error){
                    showMsg(response.msg, 'success');
                }
                else
                    showMsg(response.msg);
            }
        });
    });

    $(document).on("click", "#payment_order_receipt_in", function() {
        var payment_order_file = $("#payment_order_file").val();
        var payment_order_file_view = $("#payment_order_file_view").text();
        if(payment_order_file == '')
        {
            $("#payment_order_file").focus();
            showMsgPop('Vui lòng chọn File!');
            return false;
        }
        else{
            $("#message_pop_show").html('');
        }
        if(payment_order_file_view != ''){
            waitingDialog.show('Đang tải dữ liệu.......');
            $.ajax({
                url: BASE_URL + 'revenue/order_receipt_in_import',
                type: "POST",
                data: {payment_order_file_view:payment_order_file_view},
                dateType: "text",
                success: function (response) {
                    if(payment_order_file_view !=''){
                        if(!response.error){
                            waitingDialog.hide();
                            var msg_alert = 'Mã đơn đã được vào phiếu thu: ' + response.order_id_list;
                            if(response.order_id_list_update){
                                msg_alert += '\nMã đơn đã được cập nhật vào các đơn hàng khác: ' + response.order_id_list_update
                            }
                            if(response.order_id_list_update){
                                msg_alert += '\nMã đơn đã có tiền chi và chưa được cập nhật: ' + response.order_id_list_update_exist;
                            }
                            alert(msg_alert);
                            location.href= BASE_URL + 'revenue/receipt_add/' + payment_id + '?order_list=1';
                        }
                        else{
                            waitingDialog.hide();
                            alert(response.msg);
                        }
                    }
                }
            });
        }
        else{
            alert("Vui lòng chọn lại file!");
            return false;
        }
    });
    $(document).on("click", "#payment_order_receipt_in_update", function() {
        var payment_order_file = $("#payment_order_file").val();
        var payment_order_file_view = $("#payment_order_file_view").text();
        if(payment_order_file == '')
        {
            $("#payment_order_file").focus();
            showMsgPop('Vui lòng chọn File!');
            return false;
        }
        else{
            $("#message_pop_show").html('');
        }
        if(payment_order_file_view != ''){
            waitingDialog.show('Đang tải dữ liệu.......');
            $.ajax({
                url: BASE_URL + 'revenue/order_receipt_in_import_update',
                type: "post",
                data: {payment_order_file_view:payment_order_file_view},
                dateType: "text",
                success: function (response) {
                    if(payment_order_file_view !=''){
                        if(!response.error){
                            waitingDialog.hide();
                            if(response.order_id_list){
                                showMsgPop('Các mã đơn chưa được tạo: '+ response.order_id_list, 'success');
                            }
                            else{
                                showMsgPop('Cập nhật thành công', 'success');
                            }
                        }
                        else{
                            waitingDialog.hide();
                            alert(response.msg);
                        }
                    }
                }
            });
        }
        else{
            alert("Vui lòng chọn lại file!");
            return false;
        }
    });

    if($("#receive_at").length){
        // thời gian tạo phiếu
        $('#receive_at').datetimepicker(
            {
                format: 'DD/MM/YYYY'
            }
        ).next().on(ace.click_event, function(){
                $(this).prev().focus();
            });
    }

    $("#payment_accept").on(ace.click_event, function() {
        bootbox.confirm("Bạn có chắc duyệt thanh toán?", function(result) {
            if(result) {
                $('#payment_form').on('submit', function(e) {
                });
            }
        });
    });
    $("#payment_create").on(ace.click_event, function() {
        bootbox.confirm("Bạn có chắc tạo phiếu chi?", function(result) {
        if(result) {
            $.ajax({
                url: BASE_URL + "revenue/payment_create?route={$route}&" + '&month_filter=' + $("#month_filter").val() + '&year_filter=' + $("#year_filter").val(),
                type: "post",
                dateType: "text",
                success: function (response) {
                if (response) {
                if(!response.error){
                location.reload();
                }
                else
                showMsg(response.msg);
                }
                }
            });
            }
        });
    });

    $("#month_filter, #year_filter").on("change", function() {
        ajaxSearch();
    });
    $('.show-details-btn').on('click', function (e) {
        e.preventDefault();
        $(this).closest('tr').next().toggleClass('open');
        $(this).find(ace.vars['.icon']).toggleClass('fa-angle-double-down').toggleClass('fa-angle-double-up');
    });
})
$(document).on("click", "#payment_submit", function() {
    var id = $(this).attr('rel');
    var payment_code = $("#payment_code").val();
    var pay_account = $("#pay_account").val();

    if(payment_code == '')
    {
        $("#payment_code").focus();
        showMsg('Vui lòng nhập mã phiếu thu!');
        return false;
    }
    else{
        $("#message_show").html('');
    }
    if(pay_account == '')
    {
        $("#pay_account").focus();
        showMsg('Vui lòng chọn Tài khoản nhận tiền!');
        return false;
    }
    else{
        $("#message_show").html('');
    }
});

// phiếu thu - Tách đơn
$(document).on("click", "#payment_charge_create_button", function() {
    var to_wallet_name = $("#to_wallet_name").val();
    var to_wallet_id = $("#to_wallet_id").val();
    var actual_receive = $("#actual_receive").val();
    if(to_wallet_name == '')
    {
        $("#to_wallet_name").focus();
        showMsg('Vui lòng chọn loại ví!');
        return false;
    }
    else{
        $("#message_pop_show").html('');
    }
    if(to_wallet_id == '')
    {
        $("#to_wallet_id").focus();
        showMsg('Vui lòng nhập User ID ví!');
        return false;
    }
    else{
        $("#message_pop_show").html('');
    }
    if(actual_receive == '')
    {
        $("#actual_receive").focus();
        showMsg('Vui lòng nhập số tiền muốn nạp vào ví!');
        return false;
    }
    else{
        $("#message_pop_show").html('');
    }
});

//var columns = new Array("order_id","total_price","order_ship_fee","order_pay_fee","required_pay","order_pay_type","revenue","balance_check","payment_deviation","payment_revenue","payment_required_pay","payment_actual_fee","actual_receive","payment_fee","prepaid","prepaid_by_id");
//var inputType = new Array("text","label","label","label","label","label","label","label","label","label","label","label","text","text","label","text");
var columns = new Array("order_id","total_price","order_ship_fee","order_pay_fee","required_pay","order_pay_type","revenue","balance_check","payment_deviation","actual_receive","payment_fee","prepaid","prepaid_by_id");
var inputType = new Array("text","label","label","label","label","label","label","label","label","text","text","text","text");
var table = "payment_order_table";

var savebutton = "ajaxSave";
var deletebutton = "ajaxDelete";
var editbutton = "ajaxEdit";
var updatebutton = "ajaxUpdate";
var cancelbutton = "cancel";
var saveAnimationDelay = 3000;
var deleteAnimationDelay = 1000;
var effect = "flash";
// init variables
var trcopy;
var editing = 0;
var tdediting = 0;
var editingtrid = 0;
var editingtdcol = 0;
var inputs = ':checked,:selected,:text,textarea,select';

$(document).ready(function(){
    // init table
    blankrow = '<tr valign="top" class="inputform">';
    for(i=0;i<columns.length;i++){
        // Create input element as per the definition
        input = createInput(i,'');
        blankrow += '<td class="ajaxReq">'+input+'</td>';
    }
    blankrow += '<td><a href="javascript:;" class="'+savebutton+'" title="Lưu"><i class="ace-icon fa fa-floppy-o bigger-130"></i></a></td></tr>';

    // append blank row at the end of table
    $("."+table).append(blankrow);

    // Delete record
    $(document).on("click","."+deletebutton,function(){
        var id = $(this).attr("id");
        if(id){
            bootbox.confirm("Bạn có chắc chắn xoá mã đơn hàng "+id+"?", function(result) {
                ajax("order_id="+id,"del");
            });
        }
    });

    // Add new record
    $("."+savebutton).on("click",function(){
        var validation = 0;

        var $inputs =
            $(document).find("."+table).find(inputs).filter(function() {

                if(this.name == 'order_id'){
                    if($.trim( this.value ) == ""){
                        $(this).addClass("border-require");
                    }
                    else{
                        var data = jQuery.parseJSON(
                            jQuery.ajax({
                                url: BASE_URL + 'revenue/payment_order_check_ajax?order_id='+ this.value,
                                async: false,
                                dataType: 'json'
                            }).responseText
                        );
                        if(data.error){
                            $(this).addClass("border-require");
                            showMsg(data.msg);
                        }
                        else{
                            $(this).removeClass("border-require");
                            $("#message_show").html('');
                        }
                    }
                }
                if(this.name == 'actual_receive'){
                    if($.trim( this.value ) == ""){
                        $(this).addClass("border-require");
                        validation = 0;
                    }
                    else{
                        $(this).removeClass("border-require");
                        validation = 1;
                    }
                }
                return $.trim( this.value );
            });

        var array = $inputs.map(function(){
            return this.value;
        }).get();
        var serialized = $inputs.serialize();
        if(validation == 1){
            ajax(serialized,"save");
        }
    });

    // Add new record
    $(document).on("click","."+editbutton,function(){
        var id = $(this).attr("id");
        if(id && editing == 0 && tdediting == 0){
            // hide editing row, for the time being
            $("."+table+" tr:last-child").fadeOut("fast");
            var html;
            for(i=0;i<columns.length;i++){
                // fetch value inside the TD and place as VALUE in input field
                var val = $(document).find("."+table+" tr[id="+id+"] td[class='"+columns[i]+"']").html();
                input = createInput(i,val);
                html +='<td>'+input+'</td>';
            }
            html += '<td><a href="javascript:;" id="'+id+'" class="'+updatebutton+'" title="Cập nhật"><i class="ace-icon fa fa-floppy-o bigger-130"></i></a>&nbsp;<a href="javascript:;" id="'+id+'" class="red '+cancelbutton+'" title="Huỷ"><i class="ace-icon fa fa-share bigger-130"></i></td>';
            // Before replacing the TR contents, make a copy so when user clicks on
            trcopy = $("."+table+" tr[id="+id+"]").html();
            $("."+table+" tr[id="+id+"]").html(html);

            // set editing flag
            editing = 1;
        }
    });

    $(document).on("click","."+cancelbutton,function(){
        var id = $(this).attr("id");
        $("."+table+" tr[id='"+id+"']").html(trcopy);
        $("."+table+" tr:last-child").fadeIn("fast");
        editing = 0;
    });

    // Save button click on complete row update event
    $(document).on("click","."+updatebutton,function(){
        id = $(this).attr("id");
        serialized = $("."+table+" tr[id='"+id+"']").find(inputs).serialize();
        ajax(serialized+"&id="+id,"update");
        return;
        // clear editing flag
        editing = 0;
    });
});

createInput = function(i,str){
    if(inputType[i] == "text"){
        input = '<input type='+inputType[i]+' name='+columns[i]+' class="form-control" value='+str+' >';
    }
    else if(inputType[i] == "readonly"){
        input = '<input type="text" name='+columns[i]+' class="form-control" value="'+str+'" readonly>';
    }
    else if(inputType[i] == "label"){
        input = str;
    }
    return input;
}

ajax = function (params,action){
    $.ajax({
        type: "GET",
        url: BASE_URL + 'revenue/order_ajax',
        data : params +"&action="+action,
        dataType: "json",
        success: function(response){
            switch(action){
                case "save":
                    if(!response.error){
                        var html = "";
                        for(i=0;i<columns.length;i++){
                            if(typeof response[columns[i]] !== 'undefined'){
                                var value_return = response[columns[i]];
                            }
                            else{
                                var value_return = '';
                            }
                            html +='<td class="'+columns[i]+'">'+value_return+'</td>';
                        }
                        html += '<td><a href="javascript:;" id="'+response["order_id"]+'" class="ajaxEdit green"><i class="ace-icon fa fa-pencil bigger-130"></i></a>&nbsp;<a href="javascript:;" id="'+response["order_id"]+'" class="'+deletebutton+' red"><i class="ace-icon fa fa-trash-o bigger-130"></i></a></td>';
                        $("."+table+" tr").last().before('<tr id="'+response["order_id"]+'">'+html+'</tr>');
                        $(document).find("."+table).find(inputs).filter(function() {
                            this.value = "";
                            $(this).removeClass("success").removeClass("border-require");
                        });
                        showMsg(response.msg,'success');
                    }
                    else
                        showMsg(response.msg);
                    break;
                case "update":
                    if(!response.error){
                        $("."+cancelbutton).trigger("click");
                        console.log(response);
                        for(i=0;i<columns.length;i++){
                            $("tr[id='"+response.id+"'] td[class='"+columns[i]+"']").html(response[columns[i]]);
                        }
                        showMsg(response.msg,'success');
                    }
                    else
                        showMsg(response.msg);
                    break;
                case "del":
                    if(!response.error){
                        $("."+table+" tr[id='"+response.order_id+"']").effect("highlight",{color: '#f4667b'},500,function(){
                            $("."+table+" tr[id='"+response.order_id+"']").remove();
                        });
                        showMsg(response.msg,'success');
                    }
                    else
                        showMsg("Cập nhật không thành công, vui lòng thử lại!");

                    break;
            }
            $("#sum_actual_receive").val(response.sum_actual_receive);
            $("#sum_payment_fee").val(response.sum_payment_fee);
            $("#sum_prepaid").val(response.sum_prepaid);
            $("#sum_required_pay").val(response.sum_required_pay);
            $("#sum_deviation").val(response.sum_deviation);
        }
    });
}