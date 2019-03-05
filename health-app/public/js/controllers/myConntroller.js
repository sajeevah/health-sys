
function myEventController($scope, DTOptionsBuilder, $state, eventsService, commentService, heartrateService ) {

    $scope.events = [];
    $scope.comments = [];
    $scope.heartrates = [];

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([
            { extend: 'copy' },
            { extend: 'csv' },
            { extend: 'excel', title: 'Events Data' },
            { extend: 'pdf', title: 'Events Data' },

            {
                extend: 'print',
                customize: function (win) {
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }
        ]);


    $scope.getEvents = function(){
        eventsService.getEventsByUseId().then(function(event){
            $scope.events = event;
        });
    };

    $scope.getEvents();

    $scope.setClickedRow = function (index, obj) {
        $scope.selectedRow = index;
        $scope.selectedObject = obj;
        $scope.comments = [];
        $scope.heartrates = [];
        $scope.getEventsComments(obj._id);
        $scope.getHeartrates(obj._id);
    };

    $scope.addEvent = function(){
        $state.go('dashboards.addEvent');
    };

    $scope.publishEvents = function(){
        $state.go('dashboards.publishHome');
    };

    $scope.editEvent = function(){
        $state.go('dashboards.editEvents', {id : $scope.selectedObject._id});
    };

    $scope.eventGps = function(){
        $state.go('dashboards.eventMap', {id : $scope.selectedObject._id});
    };

    $scope.getEventsComments = function(id){
        commentService.getCommentsByEventId(id).then(function(comments){
            $scope.comments = comments;
        });
    };

    $scope.getHeartrates = function(id){
        heartrateService.getHeartrateServiceByEventId(id).then(function(heartrates){
            $scope.heartrates = heartrates;
        });
    };

};

function addEventsController($scope, $state, eventsService ) {

    $scope.addEvents = function(event){
        eventsService.addEvent(event).then(function(event){
            $state.go('dashboards.home');
        });
    };

};

function editEventsController($scope, $state, eventsService, $stateParams) {

    $scope.event = {};

    $scope.getEvent = function(){
        eventsService.getEventById($stateParams.id).then(function(event){
            $scope.event = event;
        });
    };

    $scope.getEvent();

    $scope.editEvent = function(event){
        eventsService.updateEvents(event, $stateParams.id).then(function(event){
            $state.go('dashboards.home');
        });
    };

};

function publishEventController($scope, DTOptionsBuilder, $state, $http, eventsService, commentService, heartrateService, API_ENDPOINT ) {

    $scope.events = [];
    $scope.comments = [];
    $scope.heartrates = [];

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([
            { extend: 'copy' },
            { extend: 'csv' },
            { extend: 'excel', title: 'Events Data' },
            { extend: 'pdf', title: 'Events Data' },

            {
                extend: 'print',
                customize: function (win) {
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }
        ]);

    $scope.getUserDetails = function(){
        $http.get(API_ENDPOINT.url + '/userDetails').then(function(result) {
            $scope.userDetails = result.data;
        });
    };

    $scope.getUserDetails();


    $scope.getEvents = function(){
        eventsService.getEventPublish().then(function(event){
            $scope.events = event;
        });
    };

    $scope.getEvents();

    $scope.setClickedRowEvent = function (index, obj) {
        $scope.selectedRowEvent = index;
        $scope.selectedEvent = obj;
        $scope.comments = [];
        $scope.heartrates = [];
        $scope.getEventsComments(obj._id);
        $scope.getHeartrates(obj._id);
    };

    $scope.getEventsComments = function(id){
        commentService.getCommentsByEventId(id).then(function(comments){
            $scope.comments = comments;
        });
    };

    $scope.getHeartrates = function(id){
        heartrateService.getHeartrateServiceByEventId(id).then(function(heartrates){
            $scope.heartrates = heartrates;
        });
    };

    $scope.eventGps = function(){
        $state.go('dashboards.eventMap', {id : $scope.selectedEvent._id});
    };

    $scope.setClickedRow = function (index, obj) {
        $scope.selectedRow = index;
        $scope.selectedObject = obj;
    };

    $scope.addComment = function(){
        $state.go('dashboards.addComment', {id : $scope.selectedEvent._id});
    };

    $scope.editComment = function(){

        if($scope.userDetails._id != $scope.selectedObject.user._id){
            alert("You can`t edit this comment");
        }else{
            $state.go('dashboards.editComment', {id : $scope.selectedObject._id});
        }

    };

    $scope.myEvents = function(){
        $state.go('dashboards.home');
    };

};

function addCommentsController($scope, $state, commentService, $stateParams ) {

    $scope.addComment = function(comment){
        commentService.addComments(comment, $stateParams.id).then(function(comment){
            $state.go('dashboards.publishHome');
        });
    };

};

function editCommentsController($scope, $state, commentService, $stateParams ) {

    $scope.comment = {};

    $scope.getComment = function(){
        commentService.getCommentsById($stateParams.id).then(function(comment){
            $scope.comment = comment;
        });
    };

    $scope.getComment();

    $scope.editComment = function(comment){
        commentService.editComments(comment, $scope.comment._id).then(function(comment){
            $state.go('dashboards.publishHome');
        });
    };

};

function eventMapController($scope, gpsLocationService, $stateParams){

    var mapOptions = {
        zoom: 1,
        center: new google.maps.LatLng(25,80),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.getGpsLocation = function(){
        gpsLocationService.getGpsLocationByEventId($stateParams.id).then(function(gojson){
            $scope.gojson = gojson;

            $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

            $scope.map.data.addGeoJson($scope.gojson);
        });
    };

    $scope.getGpsLocation();
}

angular
    .module('inspinia')
    .controller('myEventController', myEventController)
    .controller('addEventsController', addEventsController)
    .controller('editEventsController', editEventsController)
    .controller('publishEventController', publishEventController)
    .controller('addCommentsController', addCommentsController)
    .controller('editCommentsController', editCommentsController)
    .controller('eventMapController', eventMapController);