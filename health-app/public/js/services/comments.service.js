

function commentService($q, $http, API_ENDPOINT, useDetaisService){

    return{
        getCommentsByEventId : function(id) {
            return $q(function(resolve, reject) {
                $http.get(API_ENDPOINT.url + '/comments/event/' + id).then(function(result) {
                    if (result.data) {
                        resolve(result.data);
                    } else {
                        reject(result.data);
                    }
                })
            })
        },
        getCommentsById : function(id) {
            return $q(function(resolve, reject) {
                $http.get(API_ENDPOINT.url + '/comments/' + id).then(function(result) {
                    if (result.data) {
                        resolve(result.data);
                    } else {
                        reject(result.data);
                    }
                })
            })
        },
        addComments : function(comment, id) {
            return $q(function(resolve, reject) {
                useDetaisService.getUserDetails().then(function(userDetail){
                    comment.user = userDetail._id;
                    comment.event = id;
                    $http.post(API_ENDPOINT.url + '/comments/events/' + id, comment).then(function(result) {
                        if (result.data) {
                            resolve(result.data);
                        } else {
                            reject(result.data);
                        }
                    })
                })
            })
        },
        editComments : function(comment, id) {
            return $q(function(resolve, reject) {
                    $http.put(API_ENDPOINT.url + '/comments/' + id, comment).then(function(result) {
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
    .factory('commentService', commentService);
