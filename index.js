jQuery(document).ready(function ($) {

//	add simple support for background images:
    document.addEventListener('lazybeforeunveil', function(e){
        var bg = e.target.getAttribute('data-bg');
        if(bg){
            e.target.style.backgroundImage = 'url(' + bg + ')';
        }
    });
// 	document.addEventListener('scroll', function (event) {
// 		let sprite = $('.sprite');
// 		let bg = sprite.data('bg');
// 		if(bg) {
// 			sprite.css('background-image', 'url(' + bg + ')');
// 		}
// 	});

    $(document).on('change, keypress', '.wpcf7-form-control', function () {
        $(this).siblings('.wpcf7-not-valid-tip').remove();
        $(this).removeClass('wpcf7-not-valid');
        if (!$(document).find('.wpcf7-not-valid-tip').length) {
            $(this).parents('form').find('.wpcf7-response-output').text('');
        }
    })

    $(document).on('click', '.burger', function (e) {
        e.preventDefault();
        $('.burger').toggleClass('active');
        $('.header-menu').toggleClass('opened');
    })

    $(document).on('click', '.menu-item-has-children > a', function (e) {
        e.preventDefault();
        $(this).toggleClass('active');
        $(this).siblings('ul').slideToggle();
    })

    let videoCharts = document.getElementById("video-charts");
    if (videoCharts) {
        videoCharts.controls = false;
    }

    window.addEventListener('touchstart', () => {
        $('.sync-videos').trigger('play');
    })
    window.addEventListener('load', () => {
        $('.sync-videos').trigger('play');
    })

    $('.featured-articles').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 1000
    });

    $(document).find('img.aligncenter').each(function () {
        $(this).parent('p').addClass('text-center');
    })

    $(document).on('click', '.articles-cats a', function (e) {
        e.preventDefault();
        if ($(this).hasClass('active')) {
            return;
        }
        $('.articles-cats a').removeClass('active');
        $(this).addClass('active');
        let cat_id = $(this).data('cat_id');
        let articles_block = $('.section-articles').find('.articles');
        var data = {
            action: 'select_cat',
            cat_id: cat_id
        };
        $.ajax({
            url: ajax.url,
            data: data,
            type: 'POST',
            dataType: 'json',
            beforeSend: () => {
            },
            success: function (data) {
                $('.load-more-block').remove();
                articles_block.html('');
                articles_block.html(data['posts']);
                articles_block.after(data['load_more']);
            }
        });
    })

    $(document).on('click', '.load-more-js', function (e) {
        e.preventDefault();
        let curr_page = Math.ceil($('.section-articles').find('.articles').children('div').length / 9) + 1;
        let articles_block = $('.section-articles').find('.articles');
        let cat_id = $('.articles-cats a.active').data('cat_id')
        let button = $(this),
            data = {
                'action': 'loadmore',
                'cat_id': cat_id,
                'curr_page': curr_page,
            };

        $.ajax({
            url: ajax.url,
            data: data,
            type: 'POST',
            beforeSend: () => {
                button.text('Loading...');
            },
            success: function (data) {
                if (data) {
                    button.text('Load More');
                    articles_block.append(data);
                    if (curr_page == button.data('max-pages')) {
                        button.remove();
                    }
                } else {
                    button.remove();
                }
            }
        });
    })

    let animate = {
        sprite: $('.sprite'),
        frameWidth: 353,
        frameHeight: 302,
        colCount: 9,
        rowCount: 10,
        getCurrentFrameNumber: () => {
            let x = -parseInt(animate.sprite.css('background-position-x').slice(0, -2)) / animate.frameWidth;
            let y = -parseInt(animate.sprite.css('background-position-y').slice(0, -2)) / animate.frameHeight;
            return y * animate.colCount + x + 1;
        },
        moveFrames: (toFrame) => {
            let currFrame = animate.getCurrentFrameNumber();
            let x = -parseFloat(animate.sprite.css('background-position-x').slice(0, -2)) / animate.frameWidth;
            if (currFrame < toFrame) {
                if (x == animate.colCount - 1) {
                    animate.sprite.css('background-position-x', '0px');
                    animate.sprite.css('background-position-y', (parseFloat(animate.sprite.css('background-position-y').slice(0, -2)) - animate.frameHeight) + 'px');
                } else {
                    animate.sprite.css('background-position-x', (parseFloat(animate.sprite.css('background-position-x').slice(0, -2)) - animate.frameWidth) + 'px');
                }
            } else {
                if (x == 0) {
                    animate.sprite.css('background-position-x', -animate.frameWidth * (animate.colCount - 1) + 'px');
                    animate.sprite.css('background-position-y', (parseFloat(animate.sprite.css('background-position-y').slice(0, -2)) + animate.frameHeight) + 'px');
                } else {
                    animate.sprite.css('background-position-x', (parseFloat(animate.sprite.css('background-position-x').slice(0, -2)) + animate.frameWidth) + 'px');
                }
            }
        },
        moveToFrame: (frame) => {
            let currFrame = animate.getCurrentFrameNumber();
            let i = 0;
            animate.disableBtn(Math.abs(frame - currFrame) * 33.3)
            while (i < Math.abs(frame - currFrame)) {
                (function (i) {
                    setTimeout(() => animate.moveFrames(frame), 33.3 * i)
                })(i++)
            }
        },
        disableBtn: (time) => {
            $(document).find('.tabs-btn a').addClass('event-none');
            setTimeout(() => {
                $(document).find('.tabs-btn a').removeClass('event-none');
            }, time + 33.3)
        }
    }

    $(document).on('click', '.tabs-btn a', function (e) {
        e.preventDefault();

        if($(this).parent('li').hasClass('active')) {
            return;
        }

        let tabs = $('.tabs-btn');
        tabs.find('li').removeClass('active');
        $(this).parent('li').addClass('active');
        let index = $(this).parent('li').index();
        let tabText = $('.tab-content').find('.tab-text')
        tabText.removeClass('active');
        tabText.eq(index).addClass('active');

        let frame = $(this).data('time');
        animate.moveToFrame(frame);
    })

    $(window).on('resize', function () {
        moveChart();
    });
    moveChart();

    function moveChart() {
        let win = $(window);
        let chart = $('.tabs-content');
        if (win.width() < 768) {
            $('.assets-tabs .tabs-btn').append(chart);
            animate.frameWidth = 176.5;
            animate.frameHeight = 151;
        } else {
            $('.assets-tabs').append(chart);
            animate.frameWidth = 353;
            animate.frameHeight = 302;
        }
    }

});