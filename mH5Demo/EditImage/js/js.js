$(function() {
	var w = $(window).width();
	var h = $(window).height();
	var w1 = parseInt(w * 0.7);
	/*if (w <= 320 || h <= 580) {
		console.log(22);
		$('body').addClass('small');
	};*/
	$('#uploadbox').height(w * 0.8 + 10);
	$('#container').width(w1);
	$('#container').height(w1);


	var w1 = parseInt(w * 0.7);
	$(document).on('change', '#upload', function() {
		setTimeout(function() {
			$('#first_upload,#upload').hide();
		}, 200);
	});
	eidtor = new mo.ImageEditor({
		trigger: $('#upload'),
		container: $('#container'),
		width: w1,
		height: w1,
		stageX: $('#container')[0].offsetLeft,
		iconClose: {
			url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAATlBMVEUAAAAjHyAjHyAjHyAjHyAjHyAjHyAjHyAjHyAjHyAjHyAjHyAjHyAjHyAjHyAjHyAjHyAjHyAjHyAjHyAjHyAjHyAjHyAjHyAjHyAjHyCklL62AAAAGXRSTlMABBLsmZxqZe5iZxCfbRTvs3hcgvbgky4tYXV3RgAAATNJREFUWMOd1rGOgzAQRdFhMAkhhDWQZJf//9GVQ8QUr0C+blydK8tT2PaXX+/J0Jrer/xradu25MR7oZ3lrWwOfFdktqXdC8y3izVXVPBUVD80Zs0QBeKPQvJa316Kl0KdlwLwUgBeChVeCtDLNE/mV7wW+jhDjY/CJQrEa+HcayFu8sSTwj08KIg/LQAvBeBlFsBLIfzPQ/xJAXgpIB+Fu3hQEF9ZgD4K4WGB+lJ49MxHYd4DM/Tm3R4YJ+jHoqMA3+/2U3Dsb7coIN8038IEvVkUmJdCpQeFw1+LlwLxUXDmo9A58FIAXgrAS6HCSwF4KQAvhRqvBegt/vbASwF4KQAvBfGgIL6uEH4oHhTE1xTEg4Knw4NCmmwNTwqr5fCkkG1+7p4Vnqv5PC70/7CMs/8D+PE7NINc6OwAAAAASUVORK5CYII=',
			rect: [0, 0, 64, 64]
		},
		onClose: function() {
			if (!$('#container').is('.on')) {
				$('#flist,#first_upload,#upload').show();
				$('#upload').val('');
			}
		},
		bg: "#fff",
		id: 'bg'
	});
	/*$("#myform").validate({
		messages: {
			file: '请上传图片'
		},
		onfocusout: false,
		invalidHandler: function(form, validator) {
			var errors = validator.numberOfInvalids();
			if (errors) {
				alert(validator.errorList[0].message);
				validator.errorList[0].element.focus();
			}
		},
		errorPlacement: function(error, element) {}
	});
	$(document).on('click', '.nav li', function() {
		var i = $(this).index();
		$('.page').hide();
		switch (i) {
			case 0:
				$('.p1').show();
				break;
			case 1:
				$('.p2').show();
				break;
			case 2:
				location.href = 'photo.html'
				break;
			case 3:
				location.href = 'list.html'
				break;
		}
	});
	$(document).on('click', '.btn1 li', function() {
		var i = $(this).index();
		$('.page').hide();
		switch (i) {
			case 0:
				$('.p0').show();
				break;
			case 1:
				location.href = 'photo.html'
				break;
		}
	});


	$(document).on('click', '.add li', function() {
		var i = $(this).index();
		var $t = $(this);
		var myimg = $t.find('img')[0];
		eidtor.remove('add');
		if (i > 0) {
			eidtor.addImage({
				img: myimg,
				id: 'add'
			});
		}
	});*/

	var upProgress = function() {
		var xhr = jQuery.ajaxSettings.xhr();
		if (xhr.upload) {
			xhr.upload.onprogress = function(event) {
				var percent = 0;
				var position = event.loaded;
				var total = event.total;
				if (event.lengthComputable) {
					percent = Math.ceil(position / total * 100) + '%';
					$('.loading .current').width(percent);
				}
			};
		}
		return xhr;
	};
	var flag = true;
	$('#submit').on('click', function() {
		/*if (!$("#myform").valid()) {
			return;
		};*/

		if (flag) {
			//$('#container').append('<div class="loading"><div class="current"></div></div>');
			//$('.loading').show();
			eidtor.toDataURL(function(data) {
				$.ajax({
					type: 'POST',
					url: 'upload.php',
					data: {
						base64: data,
						type: "image/jpg"
					},
					xhr: upProgress,
					success: function(r) {
						var r = eval('(' + r + ')');
						$('input[name="pic"]').val(r.img);
						console.log(r.img);
						$.ajax({
							type: 'POST',
							url: 'http://h5.dashenw.cn/shaking/index.php?m=Activiy&c=Mothersday&a=createtun',
							data: {
								image: r.img
							},
							success: function(r2) {
								console.log(r2);
								if (r2.status == 0) {
									setTimeout(function() {
										window.location.href = "success.html?id=" + r2.data.id;
									}, 200);
								} else {
									alert(r2.info)
								}
							}
						});
					}
				});
			});
			flag = false;
		}
	});
});