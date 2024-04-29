const app = angular.module("feed-back", []);
const input = document.getElementById("input");
const input2 = document.getElementById("input2");

app.controller("FeedBack", ($scope, $http) => {
  $scope.taskName = "";
  $scope.feedBack = "";
  $scope.taskList = [];
  $scope.addTask = () => {
    if (!$scope.taskName || !$scope.feedBack) {
      return alert("Digite um nome ou feedback");
    }
    $http
      .post("http://localhost:5555/tasks/api/", {
        name: $scope.taskName,
        feedback: $scope.feedBack,
      })
      .then(
        () => {
          $scope.loadTask();
        },
        () => {
          alert("Erro");
        }
      );
  };
  $scope.deleteTask = (id) => {
    $http.delete("http://localhost:5555/tasks/api/" + id).then(() => {
      $scope.loadTask();
    });
  };

  $scope.loadTask = async () => {
    const { data } = await $http.get("http://localhost:5555/tasks/api/");
    $scope.taskList = data;
    $scope.$apply();
    input.value = "";
    input2.value = "";
    console.log($scope.taskList);
  };

  $scope.loadTask();
});
