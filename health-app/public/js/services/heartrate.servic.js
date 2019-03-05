
function heartrateService($q, $http, API_ENDPOINT){

    return{
        getHeartrateServiceByEventId : function(id) {
            return $q(function(resolve, reject) {
                $http.get(API_ENDPOINT.url + '/heartrates/event/' + id).then(function(result) {
                    if (result.data) {
                        resolve(result.data);
                    } else {
                        reject(result.data);
                    }
                })
            })
        }
    }

};

angular
    .module('inspinia')
    .factory('heartrateService', heartrateService);

