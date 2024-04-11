import route from "./routers/route.js";
import homeController from "./controllers/clients/HomeController.js";
import categoryController from "./controllers/clients/CategoryController.js";
import detailController from "./controllers/clients/DetailController.js";
import registerController from "./controllers/clients/RegisterController.js";
import loginController from "./controllers/clients/LoginController.js";
import quizController from "./controllers/clients/QuizController.js";
import resultController from "./controllers/clients/ResultController.js";
import contactController from "./controllers/clients/ContactController.js";
import feedbackController from "./controllers/clients/FeedbackController.js";
import profileController from "./controllers/clients/ProfileController.js";
import forrgotPswController from "./controllers/clients/ForgotPswController.js";
import transcriptController from "./controllers/clients/TranscriptController.js";

const app = angular.module('app', ['ngRoute']);
app.controller('main-controller', ($scope, $http, $window) => {
    $http.get("../db/Categories.js").then((response) => {
        $scope.categories = response.data;
    });

    $scope.userId = localStorage.getItem('userId');

        const checkFullname = () => {
            const fullname = localStorage.getItem('fullname');
            $scope.checkFullname = !!fullname; 
        };
    
        $scope.$watch(() => localStorage.getItem('fullname'), () => {
            checkFullname();
        });

        $scope.btnWarning = () => {
            Swal.fire({
                title: "Cảnh báo?",
                text: "Bạn cần phải đăng nhập mới có thể làm quiz!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Đăng nhập",
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
                        $window.location.href = '#!dang-nhap';
                    }
                });
        }

        $scope.confirm = (courseId) => {
            Swal.fire({
                title: "Xác nhận?",
                text: "Bạn sẽ bắt đầu làm Quiz ngay",
                icon: "info",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ok",
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
                    $window.location.href = `#!he-thong-quiz/${courseId}`;
                }
            });
        }
    
        $scope.logout = () => {
            localStorage.removeItem('fullname');
            localStorage.removeItem('userId');
            Swal.fire({
                title: 'Thành công!',
                text: 'Đã đăng xuất tài khoản!',
                icon: 'success',
                showConfirmButton: false,
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
            $window.location.href = '#!dang-nhap';   
        }
})

route(app);

const controllers = (app) => {
    homeController(app);
    categoryController(app);
    detailController(app);
    registerController(app);
    loginController(app);
    quizController(app);
    resultController(app);
    contactController(app);
    feedbackController(app);
    profileController(app);
    forrgotPswController(app);
    transcriptController(app);
}

controllers(app);