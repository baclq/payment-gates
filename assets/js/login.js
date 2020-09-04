$(document).ready(function(){
    	$("#full_name").focusout(function(){
    		if($(this).val()==''){
        		$(this).css("border-color", "#FF0000");
        			$('#check_register').attr('disabled',true);
        			 $("#error_name").text("* Vui lòng nhập họ tên!");
        	}
        	else
        	{
        		$(this).css("border-color", "#2eb82e");
        		$('#check_register').attr('disabled',false);
        		$("#error_name").text("");

        	}
       });
	   $("#email").focusout(function(){
    		if($(this).val()=='' || !isValidEmailAddress($(this).val())){
        		$(this).css("border-color", "#FF0000");
        			$('#check_register').attr('disabled',true);
        			 $("#error_email").text("* Vui lòng nhập email!");
        	}
        	else
        	{
        		$(this).css("border-color", "#2eb82e");
        		$('#check_register').attr('disabled',false);
        		$("#error_email").text("");
        	}
       });
        $("#mobile").focusout(function(){
            $pho =$("#mobile").val();
    		if($(this).val()==''){
        		$(this).css("border-color", "#FF0000");
        			$('#check_register').attr('disabled',true);
        			$("#error_mobile").text("* Vui lòng nhập số điện thoại!");
        	}
        	else if ($pho.length!=10)
        	{   
                    $(this).css("border-color", "#FF0000");
        			$('#check_register').attr('disabled',true);
        			$("#error_mobile").text("* Số điện thoại không được nhỏ hơn 10");
        	}
        	else if(!$.isNumeric($pho))
        	{
        	        $(this).css("border-color", "#FF0000");
        			$('#check_register').attr('disabled',true);
        			$("#error_mobile").text("* Số điện thoại phải là số!");  
        	}
        	else{
        		$(this).css({"border-color":"#2eb82e"});
        		$('#check_register').attr('disabled',false);
        		$("#error_mobile").text("");
        	}

    	});

   		$( "#check_register" ).one( "click", function(evt) {
   			if($("#full_name" ).val()=='')
   			{
        		$("#full_name").css("border-color", "#FF0000");
        		$('#check_register').attr('disabled',true);
				$("#error_name").text("* Vui lòng nhập họ tên!");
        	}
        	if($("#email" ).val()=='' || !isValidEmailAddress($("#email" ).val()))
   			{
        		$("#email").css("border-color", "#FF0000");
        		$('#check_register').attr('disabled',true);
				$("#error_email").text("* Vui lòng nhập email!");
        	}
        	if($("#mobile" ).val()=='')
   			{
        		$("#mobile").css("border-color", "#FF0000");
        		$('#check_register').attr('disabled',true);
        		$("#error_mobile").text("* Vui lòng nhập số điện thoại!");
        	}
		});    	
	});