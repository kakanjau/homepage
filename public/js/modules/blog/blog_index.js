/**
 * Created by qiaoliang on 14-4-29.
 */

var blogIndex = angular.module('blog_index', []);


blogIndex.controller('list', ['$scope', '$http', function($scope, $http){
    $http.get('/blog_list').success(function(data){
        $scope.blogList = data;
    });
}])