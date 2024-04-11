const quizController = (app) => {
    app.controller('QuizController', async ($scope, $rootScope,$routeParams, $http, $interval, $window) => {
        const courseId = $routeParams.id;
        $scope.courseName = '';
        $scope.subject = [];
        $scope.time = 600;
        $scope.questions = [];
        $scope.displayTime = "10:00";
        $scope.currentIndex = 0; 
        $scope.userAnswers = [];
        $http.get('../../../db/Quizs/'+ courseId+'.js')
        .then((response) => {
            $scope.questions = response.data;
            $scope.currentQuestion = $scope.questions[0];
        });

        $http.get('../../../db/Subjects.js')
        .then((response) => {
            $scope.subject = response.data;

            $scope.subject.forEach(element => {
                if (element.Id == courseId) {
                    $scope.courseName = element.Name;
                }
            });
        });
        
        $scope.currentQuestion = $scope.questions[1];
        
        function updateTime() {
            const minutes = Math.floor($scope.time / 60);
            const seconds = $scope.time % 60;
            $scope.displayTime = (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
        }

        let countdownInterval = $interval(function() {
            $scope.time--; 
            updateTime(); 
            if ($scope.time <= 0) {
                $interval.cancel(countdownInterval); 
                endQuiz();
            }
        }, 1000); 

        $scope.selectAnswer = (answerId) => {
            $scope.userAnswers[$scope.currentIndex] = answerId;
        };

        $scope.nextQuestion = () => {
            if ($scope.currentIndex < 15) {
                $scope.currentIndex++;
                $scope.currentQuestion = $scope.questions[$scope.currentIndex];
            }
        };

        $scope.prevQuestion = () => {
            if ($scope.currentIndex > 0) {
                $scope.currentIndex--;
                $scope.currentQuestion = $scope.questions[$scope.currentIndex];
            }
        };

        $scope.btnEndQuiz = () => {
            Swal.fire({
                title: "Bạn có chắc chắn kết thúc?",
                text: "Bạn sẽ không thể tiếp tục được nữa!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Kết thúc",
                cancelButtonText: "Hủy bỏ",
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
                }).then((result) => {
                    if (result.isConfirmed) {
                        endQuiz();
                    }
                });
        }

        const endQuiz = () => {
            let score = 0;

            for (let i = 0; i < 14; i++) {
                if ($scope.questions[i].AnswerId === $scope.userAnswers[i]) {
                    score++;
                }
            }

            let percentage = (score / 15) * 100;

            let scaledScore = (percentage / 100) * 10;

            scaledScore = Math.round(scaledScore * 100) / 100;

            localStorage.setItem('userAnswers', JSON.stringify($scope.userAnswers));
            localStorage.setItem('marks', scaledScore);
            localStorage.setItem('courseName', $scope.courseName);
            Swal.fire({
                title: 'Đã kết thúc bài kiểm tra!',
                text: `Số điểm của bạn là ${scaledScore}/10`,
                icon: 'success',
                showConfirmButton: true,
                timer: 2000,
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
            $window.location.href = `#!ket-qua/${courseId}`;
           
        };

    });
}

export default quizController;