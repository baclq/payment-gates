jQuery(document).ready(function($) {
  var buildWrap = document.querySelector('.build-wrap'),
    renderWrap = document.querySelector('.render-wrap'),
    editBtn = document.getElementById('edit-form'),
    formData = JSON.stringify($("#render-code").val()),
    editing = true,
    fbOptions = {
      dataType: 'json'
    };

  if (formData) {
    fbOptions.formData = JSON.parse(formData);
  }

  var toggleEdit = function() {
    document.body.classList.toggle('form-rendered', editing);
    editing = !editing;
  };

  var formBuilder = $(buildWrap).formBuilder(fbOptions).data('formBuilder');
	if($("#render-code").val()){
		toggleEdit();
		$(renderWrap).formRender({
		  dataType: 'json',
		  formData: $("#render-code").val()
		});
	}
	
  $('.form-builder-save').click(function() {
    toggleEdit();
    $(renderWrap).formRender({
      dataType: 'json',
      formData: formBuilder.formData
    });
	$("#render-code").val(formBuilder.formData);
  });

  editBtn.onclick = function() {
    toggleEdit();
  };
  toggleEdit();
});
