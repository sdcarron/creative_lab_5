angular.module('comment', [])
.controller('MainCtrl', [
  '$scope','$http',
  function($scope,$http){
    $scope.comments = [];
   
	$scope.delete = function(comment) {
      $http.delete('/comments/' + comment._id )
        .success(function(data){
          console.log("delete worked");
        });
      $scope.getAll();
    };


 $scope.addComment = function() {
      var newcomment = {title:$scope.formContent,translation:$scope.translationTxt,upvotes:0};
	var newCommentReversed={title:$scope.translationTxt, translation:$scope.formContent,upvotes:0};
      $scope.formContent='';
	$scope.translationTxt ='';
      $http.post('/comments', newcomment).success(function(data){
        $scope.comments.push(data);
      });

	$http.post('/comments', newCommentReversed).success (function(data){
		$scope.comments.push (data);
	});
    };
    $scope.upvote = function(comment) {
      return $http.put('/comments/' + comment._id + '/upvote')
        .success(function(data){
          console.log("upvote worked");
          comment.upvotes = data.upvotes;
        });
    };
	$scope.incrementUpvotes = function(comment) {
	  $scope.upvote(comment);
    };
    $scope.getAll = function() {
      return $http.get('/comments').success(function(data){
        angular.copy(data, $scope.comments);
      });
    };
    $scope.getAll();

  }
]);
