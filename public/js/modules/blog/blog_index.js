/**
 * Created by qiaoliang on 14-4-29.
 */

var blog_index = angular.module('blog_index', []);


blog_index.controller('list', ['$scope', function($scope){
    $scope.blogList = [];
    for(var i=0; i<5; i++){
        $scope.blogList.push( {id: i,
            name: 'my ' + i + ' blog!',
            intro: 'this is my  ' + i + ' blog, haha!',
            create_time: Date(),
            update_time: Date(),
            safari_count: i
        });
    }
}])