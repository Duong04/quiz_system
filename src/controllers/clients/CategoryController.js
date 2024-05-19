const categoryController = (app) => {
    app.controller('CategoryController', ($scope, $routeParams,$http) => {
        $scope.courses = [];
        $scope.categories = [];
        $scope.categoryId = $routeParams.categoryId;
        $scope.page = parseInt($routeParams.page) || 0; 
        $scope.startPage = $scope.page * 6;
        $scope.newCourses = [];
        $scope.isCheckParam = $routeParams.categoryId == 'all' ? true : false;
        $scope.category = $routeParams.categoryId;
        $http.get("../../../db/Subjects.js")
            .then((response) => {
                $scope.courses = response.data;
                if ($scope.categoryId !== 'all') { 
                    $scope.newCourses = $scope.courses.filter(course => course.Category_id === $scope.categoryId);
                    $scope.count = Math.round($scope.newCourses.length / 6);
                } else { 
                    $scope.newCourses = $scope.courses;
                    $scope.count = Math.round($scope.newCourses.length / 6);
                }
            });
            $http.get("../../../db/Categories.js")
            .then((response) => {
                $scope.categories = response.data;
            });
    });
}

export default categoryController;