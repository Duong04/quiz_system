const detailController = (app) => {
    app.controller('DetailController', ($scope, $http, $routeParams, $filter, $timeout) => {
        const courseId = $routeParams.id;
        $http.get('../../../db/Subjects.js')
        .then((response) => {
            $scope.courses = response.data;
            $scope.courseDetail = $filter('filter')($scope.courses, {Id: courseId})[0];
        });
    });
}

export default detailController;