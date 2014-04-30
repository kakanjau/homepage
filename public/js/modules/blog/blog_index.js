/**
 * Created by qiaoliang on 14-4-29.
 */

var blog_index = angular.module('blog_index', []);


blog_index.controller('list', ['$scope', '$http', function($scope, $http){
    $http.get('/blog_list').success(function(data){
        $scope.blogList = eval(data);
    });
}])