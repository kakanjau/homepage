/**
 * Created by qiaoliang on 14-4-29.
 */

var blogIndex = angular.module('blog_index', []);


blogIndex.controller('list', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http){
    $http.get('/blog_list/' + ($routeParams.blogCategory||'')).success(function(data){
        $scope.blogList = data;
    });
}])