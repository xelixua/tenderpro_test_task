/*global angular, app*/
(function () {
    "use strict";
    var app = angular.module("testApp", []);
    
    app.controller('dataView',['$scope', function (scope) {
        scope.dataView = this;
        this.noParam = false;
        this.notFound = false;
        
        var datas = [],
            getUrlParameter = function (name) {
            var fullUrl = decodeURIComponent(window.location),
                params = fullUrl.split("?")[1],
                paramsWithName,
                i = 0;
                
            if(typeof params === 'undefined'){
                return "";
            } else {
             paramsWithName= params.split("&");
            }
                
            for (; i < paramsWithName.length; i++) {
                var param = paramsWithName[i].split("=");
                if(param[0] === name)
                    return param[1];
            }
            
            return "";
        },
        requestUrl,
        URL_TEMPLATE = "http://iac.tender.pro/demo/company_COMPANYID.json",
        param = getUrlParameter("id");
            
        this.datas = datas;
        if(param === "") { 
            
            scope.dataView.noParam = true;
        } else {
            requestUrl = URL_TEMPLATE.replace("COMPANYID", getUrlParameter("id"));
            var request = new XMLHttpRequest();
            request.open('GET', requestUrl, true);
            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    console.log("test " + request.status);
                    switch(request.status){
                        case 200:
                            scope.dataView.datas = JSON.parse(request.responseText);
                            scope.$apply();
                            break;
                        case 404:
                            scope.dataView.notFound = true;
                            break;
                        default:
                            break;
                    }
                }
            };
            request.send();
        }
    }]);
})();