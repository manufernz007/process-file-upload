;
(function () {
    'use strict';

    angular.module('fileupload', ['ngSanitize']).controller('HomeController', [
            '$scope', '$http',
            function ($scope, $http) {

            }
        ]).directive('processFileUploader', function () {
        return {

            restrict: 'E',
            controller: function ($http, $scope, $sce) {
                $scope.hideForm = false;

                $('#fileupload').fileupload({
                        url: "https://upload.wistia.com",
                        formData: {
                            api_password: "7cbc62b6d5b12c43d37e1ddc74be8d3e576691abf918114eebc180c5eaf61acb"
                        },
                        dataType: 'json',
                        done: function (e, data) {
                            $scope.id = data.result.hashed_id;
                            $scope.hideForm = true;

                            $scope.wistia_async_id = "wistia_async_" + $scope.id;

                            $sce.trustAsHtml($scope.embed);
                            var j = document.createElement('script');
                            j.type = 'text/javascript';
                            j.src = '//fast.wistia.com/embed/medias/' + $scope.id + '.jsonp';
                            document.getElementsByTagName('head')[0].appendChild(j);
                            var k = document.createElement('script');
                            k.type = 'text/javascript';
                            k.src = '//fast.wistia.com/assets/external/E-v1.js';
                            document.getElementsByTagName('head')[0].appendChild(k);




                            if (!$scope.$$phase && !$scope.$root.$$phase)
                                $scope.$apply();
                        },
                        progressall: function (e, data) {
                            var progress = parseInt(data.loaded / data.total * 100, 10);
                            $('#progress .progress-bar').css(
                                'width',
                                progress + '%'
                            );
                        }
                    }).prop('disabled', !$.support.fileInput)
                    .parent().addClass($.support.fileInput ? undefined : 'disabled');

            },
            templateUrl: 'partials/file-upload.html'
        };
    });

}());