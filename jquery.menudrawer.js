(function($) {
    $.fn.menuDrawer = function() {
        function whichTransitionEvent() {
            var el = document.createElement('fake'),
                transEndEventNames = {
                    'WebkitTransition' : 'webkitTransitionEnd',// Saf 6, Android Browser
                    'MozTransition'    : 'transitionend',      // only for FF < 15
                    'transition'       : 'transitionend'       // IE10, Opera, Chrome, FF 15+, Saf 7+
                };

            for(var t in transEndEventNames){
                if( el.style[t] !== undefined ){
                    return transEndEventNames[t];
                }
            }
        }

        var transEndEventName = whichTransitionEvent(),
            menuContainer = $('#mw-menu'),
            body = $('body'),
            overlay = $('#_overlay'),
            menuTrigger = $('#_menu-btn'),
            menuClose = $('#_overlay,.icon-remove');

        var menuCheck = function() {
            if (!body.hasClass('_menu-open')) {
                body.addClass('_menu-open')
                $('html,body').css({
                    'overflow': 'hidden'
                });
            }
            else if (body.hasClass('_menu-open') && overlay.is(':visible')) {
                body.addClass('_menu-transitioning');
                overlay.one(transEndEventName, function(){
                    body.removeClass('_menu-transitioning _menu-open')
                });
                $('html,body').removeAttr('style');
            }
        }
        menuTrigger.on('click', function(){
            menuCheck();
        });
        overlay.on('click', function(){
            menuCheck();
        });
        menuClose.on('click', function(){
            menuCheck();
        });
    };
}(jQuery));
