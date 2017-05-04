$(document).ready(function () {
    //preloader
    if ($('.preloader').length) {
        $('.preloader').delay(2000).fadeOut(300);
    }

    //init wow.min.js
    new WOW().init();

    //scroll to div
    $('.linkto').click(function () {
        var link = $(this).attr('href');
        var menuPos = $('#topMenu').position().top;
        var posi = $(link).offset().top - menuPos * 2;
        console.log(posi);
        $('body,html').animate({
            scrollTop: posi
        }, 700);
    });

    //telephone mask
    $("#tel").mask("+7 (999) 999-9999");

    //form validator
    $("#sendOrder").validate({
        rules: {
            quantity: {
                required: true,
                number: true,
                min: 1,
                max: 10,
                step: 1
            },
            name: "required",
            tel: "required",
            address: "required"
        },
        messages: {
            quantity: {
                required: "Введите количество литров",
                number: "Введите ЧИСЛО литров",
                min: "Минимум 1 литр",
                max: "Максимум 10 литров",
                step: "Введите целое число литров (1,2,3,..)"
            },
            name: "Введите Ваше имя",
            tel: "Введите Ваш телефон",
            address: "Введите адрес доставки"
        },
        submitHandler: function (form) {
            var msg = $("#sendOrder").serialize();
            $.ajax({
                type: 'POST',
                url: 'fns.php',
                data: msg,
                success: function () {
                    $("#sendOrder").fadeTo(function () {
                        this.reset();
                        $('.itog').css('visibility', 'hidden');
                        $(".blur-all").addClass("blur_active");
                        $(".popup-success").show(200);
                        $(".closeSuccess").on("click", function () {
                            $(".blur-all").removeClass("blur_active");
                            $(".popup-success").hide();
                        });
                    });
                }
            });
        }
    });

    //Display coast
    var cost = 250;
    var amount, itog = 0;
    $('#litr').on('keyup', function () {
        if ($.isNumeric($('#litr').val())) {
            amount = $('#litr').val();
            itog = +amount * cost;
        } else {
            itog = 0;
        }
        $('.itog').css('visibility', 'visible');
        $('#cost').text(itog);
    });
    
    //Close drop-down menu
    $(document).on('click', function (e){ 
		var menu = $('.for-xs-size');
		if(!menu.is(e.target) && menu.has(e.target).length === 0 && $('.navbar-collapse').hasClass('in')) {
			$('.navbar-toggle').click();
		}
	});

});