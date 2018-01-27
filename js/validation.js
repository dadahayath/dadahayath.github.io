var Validation = (function () {
    
    var isEmpty = function (value) {
        return (value && value.trim() !== '') ? false : true;
    };
    
    var isValidEmail = function(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    return {
        isEmpty: isEmpty,
        isValidEmail: isValidEmail
    };
    
}());