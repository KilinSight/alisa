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
    checkAuth();
    function checkAuth() {
        var $loginBtn = $('.login-btn');
        if (localStorage.getItem('user') !== undefined) {
            $loginBtn.text('Выйти(' + localStorage.getItem('user') + ')');
            $loginBtn.addClass('logout-btn');
        }
    }

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


    $(document).on('click', '.logout-btn', function (e) {
        e.preventDefault();
        localStorage.removeItem('user');
        $('.login-btn').text('Войти');
        $('.login-btn').removeClass('logout-btn');
        $('.login div').html('');
    });

    $('.js-login-form').on('submit', function (event) {
        event.preventDefault();
        if ((($(this).find('input[type=text]').val() == 'user') && ($(this).find('input[type=password]').val() == '12345'))) {
            $(this).find('div').text('Добро пожаловать, покупатель!');
            localStorage.setItem('user', 'user');
            $('.login-btn').text('Выйти');
            $('.login-btn').addClass('logout-btn');
            setTimeout(function () {
                location.href = Routing.generate('homepage');
            },500)
        }
        else if ((($(this).find('input[type=text]').val() == 'admin') && ($(this).find('input[type=password]').val() == '54321'))) {
            $(this).find('div').text('Добро пожаловать, админ!');
            localStorage.setItem('user', 'admin');
            $('.login-btn').text('Выйти');
            $('.login-btn').addClass('logout-btn');
            setTimeout(function () {
                location.href = Routing.generate('homepage');
            },500)
        }
        else {
            $(this).find('div').text('Неверный логин и/или пароль');
        }
    })
})