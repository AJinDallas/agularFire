//var app = angular.module("sampleApp", ["firebase"]);

//app.controller("SampleCtrl", function ($scope, $firebaseArray) {
//    var ref = new Firebase("https://<your-firebase>.firebaseio.com/messages");

//    // create a synchronized array
//    $scope.messages = $firebaseArray(ref);

//    // add new items to the array
//    // the message is automatically added to Firebase!
//    $scope.addMessage = function () {
//        $scope.messages.$add({
//            text: $scope.newMessageText
//        });
//    };

//    // click on `index.html` above to see $remove() and $save() in action
//});


var myApp = angular.module('taskMgrApp', ["firebase", "ui.bootstrap"]);

// Home Controller
myApp.controller("HomeController", ["$scop e", "$firebaseArray", function ($scope, $firebaseArray) {
    // Firebase Location for Task Data
    var ref = new Firebase("https://315demo.firebaseio.com/tasks");

    //    $scope.taskName = "";  // the TODO task
    //    $scope.taskDesc = "";  // Task Description
    //    $scope.taskAssign = ""; // Task Assigned To
    //    $scope.taskDate = ""; // Task Deadline

    $scope.myTodos = $firebaseArray(ref);  // TODO holder (array)

    $scope.editMode = false;  // Application mode - TRUE == is editting, FALSE == adding a new task
    $scope.currIndex = -1;  // Current TODO index being edited

    // ADD TODO Function
    $scope.doAddTask = function () {
        $scope.myTodos.$add({ taskName: $scope.taskName, taskDesc: $scope.taskDesc, taskAssign: $scope.taskAssign, taskDate: $scope.taskDate });
        $scope.taskName = "";
        $scope.taskDesc = "";
        $scope.taskAssign = "";
        $scope.taskDate = "";
    };

    // EDIT TODO Function - this populates the input fields
    $scope.doEditTask = function (id) {
        console.log("The ID is: ", id, $scope.myTodos[id]);
        //var todo = $scope.myTodos[id];
        $scope.taskName = $scope.myTodos[id].taskName;
        $scope.taskDesc = $scope.myTodos[id].taskDesc;
        $scope.taskAssign = $scope.myTodos[id].taskAssign;
        $scope.taskDate = $scope.myTodos[id].taskDate;
        $scope.editMode = true;
        $scope.currIndex = id;
    };

    // SAVE TODO CHANGES Function - this saves the changes made above
    $scope.doSaveTask = function () {
        //        $scope.myTodos[$scope.currIndex] = { taskName: $scope.taskName, taskDesc: $scope.taskDesc, taskAssign: $scope.taskAssign, taskDate: $scope.taskDate };
        console.log($scope.currIndex);
        console.log("befoore",   $scope.myTodos);
        /*
        var objToSave = {
            taskName: $scope.taskName,
            taskDesc: $scope.taskDesc,
            taskAssign: $scope.taskAssign,
            taskDate : $scope.taskDate
        }
        $scope.myTodos[$scope.currIndex] = objToSave;
        */
        $scope.myTodos[$scope.currIndex].taskName = $scope.taskName;
        $scope.myTodos[$scope.currIndex].taskDesc = $scope.taskDesc;
        $scope.myTodos[$scope.currIndex].taskAssign = $scope.taskAssign;
        $scope.myTodos[$scope.currIndex].taskDate = $scope.taskDate;
        $scope.editMode = false;
        console.log("affter ", $scope.myTodos);
        $scope.myTodos.$save();
        //$scope.myTodos.$save($scope.myTodos[$scope.currIndex]);

        $scope.taskName = "";
        $scope.taskDesc = "";
        $scope.taskAssign = "";
        $scope.taskDate = "";
    };

    // CANCEL TODO CHANGES Function - sets edit mode back to false
    $scope.doCancelSave = function () {
        $scope.taskName = "";
        $scope.taskDesc = "";
        $scope.taskAssign = "";
        $scope.taskDate = "";
        $scope.editMode = false;
    };

}]);
