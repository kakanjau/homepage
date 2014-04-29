/**
 * Created by qiaoliang on 14-4-29.
 */

var blog_main = angular.module('blog_main', ['blog_index']);

blog_main.config(['$routeProvider', function($routeProvider){
    $routeProvider.
        when('/blog_list', {
            templateUrl: 'partials/blog/blog_list.html',
            controller: 'list'
        }).
        when('/blog_detail/:blogId', {

        }).
        otherwise({
            redirectTo: '/blog_list'
        });
}]);
