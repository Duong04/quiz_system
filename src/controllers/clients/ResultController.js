const axios_ins = axios.create({
    baseURL: "https://easy-quiz-f2641-default-rtdb.firebaseio.com"
});

async function getUser() {
    const userId = localStorage.getItem("userId");

    const response = await axios_ins.get(`users/${userId}.json`);

    return response.data;
}

async function saveQuizScore(courseName, marks) {
    const user = await getUser();
    const data = {
        fullname: user.fullname,
        email: user.email,
        userId: user.id,
        courseName,
        score: marks
    }
    const response = await axios_ins.post('/quiz_scores.json', data);

    if (response.status == 200) {
        Swal.fire({
            title: "Thành công",
            text: "Điểm của bạn đã được lưu!",
            icon: "success",
            showConfirmButton: true,
            timer: 3000,
            showClass: {
                popup: `
                    animate__animated
                    animate__fadeInDown
                    animate__faster
                `
            },
            hideClass: {
                popup: `
                    animate__animated
                    animate__fadeOutUp
                    animate__faster
                `
            }
        });
        localStorage.removeItem('marks');
        localStorage.removeItem('courseName');
        localStorage.removeItem('userAnswers');

        window.location.href = `#!bang-diem/${user.id}`;
    }
}


const resultController = (app) => {
    app.controller('ResultController', ($scope, $rootScope,$routeParams, $http, $interval, $window) => {
        const courseId = $routeParams.id;
        $scope.questions = [];
        $http.get(`../../../db/Quizs/${courseId}.js`)
        .then(response => {
            $scope.questions = response.data;
        });

        $scope.userAnswers = JSON.parse(localStorage.getItem('userAnswers'));
        $scope.marks = localStorage.getItem('marks');
        $scope.courseName = localStorage.getItem('courseName');

        $scope.statusQuiz = $scope.marks >= 5 ? 'Đạt' : 'Không đạt'; 

        $scope.saveScore = () => {
            saveQuizScore($scope.courseName, $scope.marks);
        }
    });
}

export default resultController;