var columns = new Array("product_id","product_quantity","source_id","inventory");
var inputType = new Array("select","text","label","label","label");
var table = "store_product_table";

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
		if(i == 1){
			blankrow += '<td class="w-150 ajaxReq">'+input+'</td>';
		}else{
			blankrow += '<td class="ajaxReq">'+input+'</td>';
		}	
	}
	blankrow += '<td class="center"><a href="javascript:;" class="'+savebutton+'" title="Thêm dòng"><i class="ace-icon fas fa-plus-circle bigger-130"></i></a></td></tr>';

	// append blank row at the end of table
	$("."+table).append(blankrow);
	$('.chosen-select').chosen({
        allow_single_deselect:true
    });
	// Delete record
	$(document).on("click","."+deletebutton,function(){
		var id = $(this).attr("id");
		if(id){
			bootbox.confirm("Bạn có chắc chắn xoá mã sản phẩm "+id+"?", function(result) {
				ajax("product_id="+id,"del");
			});
		}
	});

	// Add new record
	$("."+savebutton).on("click",function(){
		var validation = 0;
			//alert('fgkf');
		var $inputs =
					$(document).find("."+table).find(inputs).filter(function() {

						if(this.name == 'product_id'){
							if($.trim( this.value ) == ""){
								$(this).addClass("border-require");
							}
							else{
								var data = jQuery.parseJSON(
									jQuery.ajax({
										url: BASE_URL + 'store/store_product_check_ajax?product_id='+ this.value,
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

						if(this.name == 'product_quantity'){
							if($.trim( this.value ) == ""){
								$(this).addClass("border-require");
								showMsg('Vui lòng nhập số lượng!');
								validation = 0;
							}
							else{
								$(this).removeClass("border-require");
								$("#message_show").html('');
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
				if(columns[i] == 'product_id'){
					var val = id;
				}else{
					var val = $(document).find("."+table+" tr[id="+id+"] td[class='"+columns[i]+"']").html();
				}	
				input = createInput(i,val);
				html +='<td>'+input+'</td>';
			}
			html += '<td class="center"><a href="javascript:;" id="'+id+'" class="'+updatebutton+'" title="Cập nhật"><i class="ace-icon fa fa-floppy-o bigger-130"></i></a>&nbsp;<a href="javascript:;" id="'+id+'" class="red '+cancelbutton+'" title="Huỷ"><i class="ace-icon fa fa-share bigger-130"></i></td>';
			// Before replacing the TR contents, make a copy so when user clicks on
			trcopy = $("."+table+" tr[id="+id+"]").html();
			$("."+table+" tr[id="+id+"]").html(html);

			// set editing flag
			editing = 1;

			$('.chosen-select').chosen({
		        allow_single_deselect:true
		    });
		    $('#product_id').val(id);
			$('#product_id').trigger("chosen:updated");
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
		else if(inputType[i] == "select"){
			input = '<select class="chosen-select" id="product_id" name='+columns[i]+'>';
				if (aDataProductJsons !=='') {
				selectObject = JSON.parse(aDataProductJsons);

				for (var i = 0; i < selectObject.length; i++) {
					if(selectObject[i].id == str)
						selected = "selected";
                    else
                        var selected = '';
					input += '<option value="'+ selectObject[i].id +'" '+selected+'>'+ selectObject[i].name +'</option>';	
					var child = selectObject[i].child;
					if(typeof child != "undefined"){
						for (var j = 0; j < child.length; j++) {
							input += '<option value="'+ selectObject[i].child[j].id +'" '+selected+'>|______'+ selectObject[i].child[j].attribute_name +'</option>';
						}
					}
				}
			}
			input += "<select>";
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
    if($("#from_store_id").length > 0){
        var store_id = $("#from_store_id").val();
    }
    else{
        var store_id = $("#store_id").val();
    }

	$.ajax({
		type: "GET",
		url: BASE_URL + 'store/product_ajax',
        data : params + "&store_id=" + store_id + "&action="+action,
		dataType: "json",
		success: function(response){
			switch(action){
				case "save":
					if(!response.error){
						var html = "";
						for(i=0;i<columns.length;i++){
							if(typeof response[columns[i]] !== 'undefined' && response[columns[i]] != null){
								if(columns[i] == 'product_id'){
									var value_return = response['product_name'];
									var classname = 'align-left';
								}else{
									var value_return = response[columns[i]];
									var classname = 'center';
								}
							}
							else{
								var value_return = '';
							}							
							html +='<td class="'+columns[i]+'">'+value_return+'</td>';
						}						
						html += '<td><a href="javascript:;" id="'+response["product_id"]+'" class="ajaxEdit green"><i class="ace-icon fa fa-pencil bigger-130"></i></a>&nbsp;<a href="javascript:;" id="'+response["product_id"]+'" class="'+deletebutton+' red"><i class="ace-icon fa fa-trash-o bigger-130"></i></a></td>';						
						$("."+table+" tr").last().before('<tr id="'+response["product_id"]+'">'+html+'</tr>');
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
						console.log(response);
						$("."+cancelbutton).trigger("click");
						for(i=0;i<columns.length;i++){
							if(columns[i] == 'product_id'){
								$("tr[id='"+response.id+"'] td[class='"+columns[i]+"']").html(response['product_name']);
							}else{
								$("tr[id='"+response.id+"'] td[class='"+columns[i]+"']").html(response[columns[i]]);
							}							

						}
						showMsg(response.msg,'success');
					}
					else
						showMsg(response.msg);
					break;
				case "del":
					if(!response.error){
						$("."+table+" tr[id='"+response.product_id+"']").effect("highlight",{color: '#f4667b'},500,function(){
							$("."+table+" tr[id='"+response.product_id+"']").remove();
						});
						showMsg(response.msg,'success');
					}
					else
						showMsg("Cập nhật không thành công, vui lòng thử lại!");

					break;
			}
		}
	});
}
