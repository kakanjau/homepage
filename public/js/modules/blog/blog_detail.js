/**
 * Created by qiaoliang on 14-4-29.
 */

var blogDetail = angular.module('blog_detail', ['ngSanitize']);


blogDetail.controller('detail', ['$scope', '$routeParams', '$http', '$sanitize', function($scope, $routeParams, $http, $sanitize){
	$http.get('/blog_detail/' + $routeParams.blogId).success(function(data){		
	    $scope.blogId = data.id;
	    $scope.blogName = data.name;
	    $scope.artist = $sanitize(data.content);
	});
}])