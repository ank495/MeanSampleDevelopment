var app = angular.module('mainApp',[]);

app.controller('sdAppCtrl',['$scope','$http',function($scope,$http){
  console.log("In the controller");

var refresh = function(){
      $http.get('/contactlist').then(function(response){
        console.log("got the response back");
         $scope.contactlist = response.data;
         $scope.contact = {};
      });
  };

refresh();

  $scope.addContact = function(){
    console.log($scope.contact);
    $http.post('/contactlist',$scope.contact).then(function(response){
      console.log(response.data);
      refresh();
    })
  };

  $scope.editContact = function(id){
    console.log(id);
    $http.get('/contactlist/'+ id).then(function(response){
      console.log(response.data);
      $scope.contact = response.data;
    });
  };

  $scope.sendMail = function(){
    $http.get('/sendMail').then(function(response){
      console.log("Mail sent");
    })
  }


  $scope.updateContact = function(){
    console.log($scope.contact._id);
    console.log($scope.contact);
    $http.put('/contactlist/'+ $scope.contact._id, $scope.contact).then(function(response){
      console.log(response.data);
      refresh();
    })
  }


  $scope.deleteContact = function(id){
    $http.delete('/contactlist/'+ id).then(function(response){
      console.log(response.data);
    });
  };

}]);
