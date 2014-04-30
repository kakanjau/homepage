/**
 * Created by qiaoliang on 14-4-29.
 */

var blog_detail = angular.module('blog_detail', ['ngSanitize']);


blog_detail.controller('detail', ['$scope', '$routeParams', '$http', '$sanitize', function($scope, $routeParams, $http, $sanitize){
	$http.get('/blog_detail/' + $routeParams.blogId).success(function(data){		
	    $scope.blogId = data.id;
	    $scope.blogName = data.name;
	    $scope.artist = $sanitize(data.content);
	});
}])