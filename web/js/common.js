$(document).ready(function () {
    //корзина

    var prices = $('.basket__item-price span'),
        allprice = 0;

    prices.each(function () {
        var val = +($(this).text());
        allprice = allprice + val;
    })

    $('.basket__all-price span').text(allprice);

    //добавление в корзину


    $('.catalog__item button').click(function () {
        $.ajax({
            url: url,
            method: 'post',
            data: $(this).data('goodId'),
            success: function (result) {

            },
            error: function (error) {

            }
        });
    })

    //убрать из корзины

    $('.basket__item button').click(function () {
        $(this).parent().fadeOut();
        $.ajax({
            url: url,
            method: 'post',
            data: $(this).data('goodId'),
            success: function (result) {

            },
            error: function (error) {

            }
        });
    })


})