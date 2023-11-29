//Jivo site
function jivo_onIntroduction() {
    let apiResult = jivo_api.getContactInfo();

    $.post("Home/WriteToUs", {
        name: apiResult.client_name,
        email: apiResult.email,
        phone: apiResult.phone,
        feedback: apiResult.description,
        isJivo: true,
    });
}

//Скролл страницы по точкам

var lastId,
    verticalMenu = $(".vertical-menu"),
    verticalMenutems = verticalMenu.find("a"),
    scrollItems = verticalMenutems.map(function () {
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
    });

var gumburgerMenu = $(".js-gumburger-menu__list").find("a");
let countSection = 0;
let itemSlider = $('.section');

verticalMenutems.click(function (e) {
    var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top;

    if ((window.matchMedia("(max-width: 480px)").matches)) {
        $('html, body').stop().animate({
            scrollTop: offsetTop - '90' + 'px'
        }, 300);
    } else {
        $('html, body').stop().animate({
            scrollTop: offsetTop - '30' + 'px'
        }, 300);
    }

    e.preventDefault();

    let data = $(this).attr('data-value');

    itemSlider.each(function (index, item) {
      
        if (data == index) {
            countSection = index;
            itemSlider.removeClass("active");
            $(this).addClass("active");
        }
    })
    
});

$(window).scroll(function () {
    // Get container scroll position
    var fromTop = $(this).scrollTop() + 100;

    // Get id of current scroll item
    var cur = scrollItems.map(function () {
        if ($(this).offset().top < fromTop)
            return this;
    });
    // Get the id of the current element
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
        lastId = id;
        // Set/remove active class

        verticalMenutems
            .parent().removeClass("active")
            .end().filter("[href='#" + id + "']").parent().addClass("active");
        gumburgerMenu
            .parent().removeClass("active")
            .end().filter("[href='#" + id + "']").parent().addClass("active");
    }
});

//Скролл страницы по кнопкам

let scrollAnimate = function () {
    $('html, body').stop().animate({
        scrollTop: $('.section.active').offset().top - '30' + 'px'
    }, 300);
}

$(".vertical-buttons__btn_next").on('click', function () {
    itemSlider[countSection].classList.remove("active");
    countSection++
    if (countSection >= itemSlider.length) {
        countSection = 0;
    }
    itemSlider[countSection].classList.add('active');
    scrollAnimate();
})

$(".vertical-buttons__btn_prev").on('click', function () {
    itemSlider[countSection].classList.remove("active");
    countSection--
    if (countSection < 0) {
        countSection = itemSlider.length - 1;
    }
    itemSlider[countSection].classList.add('active');
    scrollAnimate();
})

// Гамбургер меню

$('.gumburger-btn').on('click', function () {
    $('.gumburger-menu').css('transition', '.5s');
    $('.gumburger-menu').css('left', '0');
});

$('.js-close-gumburger').on('click', function () {
    $('.gumburger-menu').css('transition', '.5s');
    $('.gumburger-menu').css('left', '-100%');
});


$('.js-gumburger-menu__list li a').on('click', function (e) {
    if ((window.matchMedia("(max-width: 480px)").matches)) {
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - '90' + 'px'
        }, 300, 'linear');
    } else {
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - '30' + 'px'
        }, 300, 'linear');
    }

    $('.js-gumburger-menu__list li a').parent().removeClass('active');
    $(this).parent().addClass('active');
    $('.gumburger-menu').css('transition', '.5s');
    $('.gumburger-menu').css('left', '-100%');

    e.preventDefault();

    let data = $(this).attr('data-value');

    itemSlider.each(function (index, item) {

        if (data == index) {
            countSection = index;
            itemSlider.removeClass("active");
            $(this).addClass("active");
        }
    })
});

$('.circle-link').on('click', function (e) {
    e.preventDefault();

    $('html, body').animate({
        scrollTop: $($(this).attr('href')).offset().top - '30' + 'px'
    }, 300, 'linear');

    let data = $(this).attr('data-value');

    itemSlider.each(function (index, item) {

        if (data == index) {
            countSection = index;
            itemSlider.removeClass("active");
            $(this).addClass("active");
        }
    })
});

$('.js-scroll-project').on('click', function () {

    if ((window.matchMedia("(max-width: 480px)").matches)) {
        $('html, body').animate({
            scrollTop: $('#js-section-4').offset().top - '90' + 'px'
        }, 300, 'linear');
    } else {
        $('html, body').animate({
            scrollTop: $('#js-section-4').offset().top - '30' + 'px'
        }, 300, 'linear');
    }
})

// Попап


$('.js-show-popup').on('click', function () {
    $('.feedback-popup').css('display', 'flex');
});

$('.js-show-feedback').on('click', function () {
    $('.feedback-popup').css('display', 'flex');
});

$('.js-close-popup').on('click', function () {
    $('.feedback-popup').css('display', 'none');
});

// Слайдер

$(document).ready(function () {
    $('.slider-list').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: '.slider__btn_next',
        prevArrow: '.slider__btn_prev',
        vertical: true,
        draggable: false,
        responsive: [
            {
                breakpoint: 560,
                settings: {
                    slidesToShow: 2
                },
                draggable: true
            }
        ]
    });

    $('.slider-list_work').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: '.slider__btn_next',
        prevArrow: '.slider__btn_prev',
    });

    // Валидация формы

    function formValidate(form) {
        form.validate({
            rules: {
                name: {
                    required: true
                },
                email: {
                    required: true
                },
                phone: {
                    required: true,
                    minlength: 10
                }
            },
            messages: {
                name: {
                    required: "Введите имя",
                },
                email: {
                    required: "Введите email",
                    email: "Невалидный email"
                },
                phone: {
                    required: "Введите телефон",
                    minlength: "Не менее 10 цифр"
                }
            },
            submitHandler: function (form) {
                let data = {};

                data["name"] = form.elements.name.value;
                data["email"] = form.elements.email.value;
                data["phone"] = form.elements.phone.value;
                data["feedback"] = form.elements.feedback.value;
                data["isJivo"] = false;

                $.ajax({
                    type: "POST",
                    url: 'Home/WriteToUs',
                    data: data,
                    success: function (response) {
                        if (response.sucсess != "true") {
                            popupShow('Спасибо за заявку, мы свяжемся с вами в ближайшее время');
                            form.reset();
                        } else {
                            popupShow('Произошла ошибка, попробуйте еще раз');
                        }
                    }
                });
            }
        });
    }

    formValidate($('#main-form'));
    formValidate($('#main-form-popup'));

    let popupShow = function (text) {
        $(".modal").each(function () {
            $(this).find('.modal__title').append(text);
            $(this).wrap('<div class="overlay"></div>')
            $(this).parents(".overlay").addClass("open");
            setTimeout(function () {
                $(".modal").addClass("open");
            }, 350);
        });
        $("#modal-close").on('click', function () {
            $(".modal").each(function () {
                $(this).removeClass("open");
                setTimeout(function () {
                    $('.overlay').removeClass("open");
                    $('.feedback-popup').css('display', 'none');
                    if ((window.matchMedia("(max-width: 480px)").matches)) {
                        $('html, body').stop().animate({
                            scrollTop: $('#js-section-1').offset().top - '90' + 'px'
                        }, 300)
                    } else {
                        $('html, body').stop().animate({
                            scrollTop: $('#js-section-1').offset().top - '30' + 'px'
                        }, 300)
                    }
                    
                }, 350);
                setTimeout(() => $(".modal").find('.modal__title').empty(), 500);
            });
        });
    }

    // Маска телефона

    function maskPhone(phone) {
        phone.inputmask("+7 - 999 - 999 - 99 - 99", {
            showMaskOnHover: false,
            noValuePatching: false,
            autoUnmask: true
        });
    }

    maskPhone($('#phone'));
    maskPhone($('#phone-popup'));

    autosize($('textarea'));
});




