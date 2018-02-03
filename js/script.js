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
    
    var setCopyrights = function() {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', function() {
            if(this.readyState == 4 && this.status == 200) {
                var responseObject = JSON.parse(this.responseText);
                document.querySelector(".copyrights").innerHTML = '&copy; ' + responseObject.year + '. All rights reserved.';
            }
        });
        xhr.open('GET', 'api/date.php', true);
        xhr.send();
    };
    
    var onLoad = function() {
        setHomeTopHeight();
        attachListeners();
        setCopyrights();
    };
    
    window.addEventListener('load', onLoad);
    
}());