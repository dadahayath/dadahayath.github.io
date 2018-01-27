(function() {
    
    var setHomeTopHeight = function() {
        var homeTop = document.querySelector('.home-top');
        if(homeTop && window.innerWidth > 800) {
            homeTop.style.height = window.innerHeight + 'px';
        } else if(homeTop) {
            homeTop.style.height = 'auto';
        }
    };
    
    var fixHeader = function() {
        if(document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
            document.querySelector('.header').classList.add('header-fixed');
        } else {
            document.querySelector('.header').classList.remove('header-fixed');
        }
    };
    
    var toggleMobileMenu = function() {
        var header = document.querySelector('.header');
        header.classList.toggle('show-menu');
    };
    
    var attachListeners = function() {
        window.addEventListener('resize', setHomeTopHeight);
        window.addEventListener('scroll', fixHeader);
        
        document.querySelector('.mobile-menu-button').addEventListener('click', toggleMobileMenu);
    };
    
    var onLoad = function() {
        setHomeTopHeight();
        attachListeners();
    };
    
    window.addEventListener('load', onLoad);
    
}());