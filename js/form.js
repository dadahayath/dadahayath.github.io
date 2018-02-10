(function(window, document, Validation, ADP) {
    
    var findAncestor = function (element, className) {
        while ((element = element.parentElement) && !element.classList.contains(className));
        return element;
    }

    var showError = function(element) {
        var formInput = findAncestor(element, 'form-input');
        formInput.classList.add('error');
    };

    var hideError = function (element) {
        var formInput = findAncestor(element, 'form-input');
        formInput.classList.remove('error');
    };

    var validate = function (element, config) {
        if(Validation.isValid(element.value, config)) {
            hideError(element);
            return true;
        } else {
            showError(element);
            return false;
        }
    };

    var validateEmpty = function (e) {
        validate(e.currentTarget, {
            empty: true
        });
    };
    
    var validateEmail = function (e) {
        validate(e.currentTarget, {
            empty: true,
            email: true
        });
    };
    
    var isFormValid = function () {
        var nameValid = validate(document.getElementById('name-field'), {
            empty: true
        });
        var emailValid = validate(document.getElementById('email-field'), {
            empty: true,
            email: true
        });
        var messageValid = validate(document.getElementById('message-field'), {
            empty: true
        });
        
        if(!nameValid || !emailValid || !messageValid) {
            return false;
        } else {
            return true;
        }
    };
    
    var getFormString = function () {
        var name = document.getElementById('name-field').value;
        var email = document.getElementById('email-field').value;
        var message = document.getElementById('message-field').value;
        var captcha = grecaptcha.getResponse();
        
        return 'name=' + name + '&email=' + email + '&message=' + message + '&captcha=' + captcha;
    };
    
    var showLoadingIcon = function () {
        var loadingElement = document.createElement('div');
        loadingElement.classList.add('loading-section');
        document.querySelector('.contact-form-wrap').appendChild(loadingElement);
    };
    
    var hideLoadingIcon = function () {
        var loadingElement = document.querySelector('.loading-section');
        if(loadingElement) {
            loadingElement.parentNode.removeChild(loadingElement);
        }
    };
    
    var showMessageSuccess = function () {
        var successElement = document.querySelector('.form-success');
        ADP.show(successElement, 'fade');
        setTimeout(function () {
            ADP.hide(successElement, 'fade');
        }, 3000);
    };
    
    var showMessageFailure = function () {
        var failureElement = document.querySelector('.form-failure');
        ADP.show(failureElement, 'fade');
        setTimeout(function () {
            ADP.hide(failureElement, 'fade');
        }, 3000);
    };
    
    var resetForm = function () {
        document.querySelector('.contact-form-wrap form').reset();
    };
    
    var sendForm = function () {
        if(isFormValid()) {
            showLoadingIcon();
            var xhr = new XMLHttpRequest();
            xhr.addEventListener('error', function() {
                hideLoadingIcon();
                showMessageFailure();
            });
            xhr.addEventListener('readystatechange', function() {
                if(this.readyState == 4 && this.status == 200) {
                    hideLoadingIcon();
                    var responseObject = JSON.parse(this.responseText);
                    if(responseObject.status == 'ok') {
                        resetForm();
                        showMessageSuccess();
                    } else {
                        showMessageFailure();
                    }
                }
            });
            xhr.open('POST', 'api/contact-form.php', true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.send(getFormString());
        }
    };
    
    var onLoad = function () {
        document.getElementById('name-field').addEventListener('blur', validateEmpty);
        document.getElementById('name-field').addEventListener('keyup', validateEmpty);
        
        document.getElementById('email-field').addEventListener('blur', validateEmail);
        document.getElementById('email-field').addEventListener('keyup', validateEmail);
        
        document.getElementById('message-field').addEventListener('blur', validateEmpty);
        document.getElementById('message-field').addEventListener('keyup', validateEmpty);
        
        document.getElementById('submit-button').addEventListener('click', sendForm);
    };
    
    window.addEventListener('load', onLoad);
    
}(window, document, Validation, ADP));
