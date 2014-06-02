/**
 * Created by qiaoliang on 14-5-26.
 */

var blogEditor = angular.module('blog_editor', []);

blogEditor.controller('editor', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http){
    $scope.preview = function(){
        if($scope.md_content){
            $scope.md_content_html = new Showdown.converter().makeHtml( $scope.md_content);
            $("#blog_editor_preview").modal({backdrop:true, keyboard:true, show:true});
        }else{
            $("#alert").modal({backdrop:true, keyboard:true, show:true});
        }
    }
}]);