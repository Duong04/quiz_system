const searchController = (app) => {
    app.controller('SearchController', ($scope, $http, $routeParams, $window) => {
        $scope.courses = [];
        $scope.data = $routeParams.data;
        $http.get('/db/Subjects.js')
        .then(response => {
            $scope.courses = response.data
        });
    });
}

export default searchController;