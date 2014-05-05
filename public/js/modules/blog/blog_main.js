/**
 * Created by qiaoliang on 14-4-29.
 */

var blogMain = angular.module('blog_main', ['blog_index', 'blog_detail']);

blogMain.config(['$routeProvider', function($routeProvider){
    $routeProvider.
        when('/blog_list', {
            templateUrl: 'partials/blog/blog_list.html',
            controller: 'list'
        }).
        when('/blog_list/:blogCategory', {
            templateUrl: 'partials/blog/blog_list.html',
            controller: 'list'           
        }).
        when('/blog_detail/:blogId', {
            templateUrl: 'partials/blog/blog_detail.html',
            controller: 'detail'
        }).
        otherwise({
            redirectTo: '/blog_list'
        });
}]);

blogMain.controller('aside', ['$scope', function($scope){
    $scope.format = function(arg) {

    }
}]);