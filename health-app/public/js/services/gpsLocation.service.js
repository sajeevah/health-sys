
function gpsLocationService($q, $http, API_ENDPOINT){

    return{
        getGpsLocationByEventId : function(id) {
            return $q(function(resolve, reject) {
                $http.get(API_ENDPOINT.url + '/gpslocation/event/' + id).then(function(result) {
                    if (result.data) {
                        resolve(result.data[0].geoJson);
                    } else {
                        reject(result.data);
                    }
                })
            })
        }
    };

};

angular
    .module('inspinia')
    .factory('gpsLocationService', gpsLocationService);

