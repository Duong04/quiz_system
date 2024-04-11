const homeController = (app) => {
    app.controller('HomeController', ($scope, $http) => {
        $scope.courses = [];
        $http.get("../../../db/Subjects.js")
            .then((response) => {
                $scope.courses = response.data;
            });
    });
}
  
export default homeController;