const loginController = (app) => {
    app.controller('LoginController', ($scope, $window, $http) => {
        $scope.email = "";
        $scope.password = ""; 

        function messageWarning(text) {
            Swal.fire({
                title: "Cảnh báo!",
                text: text,
                icon: "info",
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
                        animate__fadeOutDown
                        animate__faster
                        `
                }
            })
        }

        function messageSuccess(text) {
            Swal.fire({
                title: 'Thành công!',
                text: text,
                icon: 'success',
                showConfirmButton: false,
                timer: 1200,
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
        }

        const checkLogin = (email, password) => {
            $http.get('https://easy-quiz-f2641-default-rtdb.firebaseio.com/users.json')
            .then((response) => {
                const users = response.data;
                let isCheckUser = false;
                let user = {};
                for(let key in users) {
                    if (users[key].email === email) {
                        isCheckUser = true;
                        user = users[key];
                    }
                }

                if (isCheckUser) {
                    if (user.password == password) {
                        messageSuccess('Đăng nhập thành công!');
                        localStorage.setItem('fullname', user.fullname);
                        localStorage.setItem('userId', user.id);
                        $window.location.href = '#!';
                    }else {
                        messageWarning('Mật khẩu không đúng!');
                    }
                }else {
                    messageWarning('Tài khoản này chưa được đăng ký!');
                }
            });
        }

        $scope.submitForm = () => {
            checkLogin($scope.email, $scope.password);
        }
    });
}

export default loginController;