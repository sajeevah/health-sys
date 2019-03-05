

function eventsService($q, $http, API_ENDPOINT, useDetaisService){

    return{
        getEventsByUseId : function() {
            return $q(function(resolve, reject) {
                useDetaisService.getUserDetails().then(function(userDetail){
                    $http.get(API_ENDPOINT.url + '/events/user/' + userDetail._id).then(function(result) {
                        if (result.data) {
                            resolve(result.data);
                        } else {
                            reject(result.data);
                        }
                    })
                });
            })
        },
        addEvent : function(event) {
            return $q(function(resolve, reject) {
                useDetaisService.getUserDetails().then(function(userDetail){
                    $http.post(API_ENDPOINT.url + '/events/user/' + userDetail._id, event).then(function(result) {
                        if (result.data) {
                            resolve(result.data);
                        } else {
                            reject(result.data);
                        }
                    })
                })
            })
        },
        updateEvents : function(event, id) {
            return $q(function(resolve, reject) {
                $http.put(API_ENDPOINT.url + '/events/'+ id, event).then(function(result) {
                    if (result.data) {
                        resolve(result.data);
                    } else {
                        reject(result.data);
                    }
                })
            })
        },
        getEventById : function(id) {
            return $q(function(resolve, reject) {
                $http.get(API_ENDPOINT.url + '/events/'+ id).then(function(result) {
                    if (result.data) {
                        resolve(result.data);
                    } else {
                        reject(result.data);
                    }
                })
            })
        },
        getEventPublish : function() {
            return $q(function(resolve, reject) {
                $http.get(API_ENDPOINT.url + '/events/publish').then(function(result) {
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
    .factory('eventsService', eventsService);
