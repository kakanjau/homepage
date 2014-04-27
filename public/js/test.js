/**
 * Created by qiaoliang on 14-4-26.
 */
'use strict'

var test1 = angular.module('test1', []);

test1.controller('t1', function($scope){
    $scope.name = 'hello world';
})