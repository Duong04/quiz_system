const registerController = (app) => {
    app.controller('RegisterController', ($scope, $window, $http) => {
        $scope.userName = '';
        $scope.email = '';
        $scope.password = '';
        $scope.confirmPsw = '';

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

        const createUser = (email, userName, password) => {
            $http.post('https://easy-quiz-f2641-default-rtdb.firebaseio.com/users.json', {email, userName, password})
            .then((response) => {
                if (response.status == 200) {
                    $http.patch(`https://easy-quiz-f2641-default-rtdb.firebaseio.com/users/${response.data.name}.json`, {id: response.data.name})
                    .then((response) => {
                        if (response.status == 200) {
                            messageSuccess('Đăng ký tài khoản thành công');
                            $window.location.href = '#!dang-nhap';
                        }
                    });
                }
            });
        }

        const checkMail = (email, userName, password) => {
            $http.get('https://easy-quiz-f2641-default-rtdb.firebaseio.com/users.json')
            .then(response => {
                let isCheckMail = true;
                const users = response.data;
                for (let key in users) {
                    if (users[key].email == email) {
                        isCheckMail = false;
                    }
                }
                if (!isCheckMail) {
                    messageWarning('Tài khoản này đã tồn tại');
                }else {
                    createUser(email, userName, password);
                    return true;
                }
                return isCheckMail;
            })
        }

        $scope.submitForm = () => {
            checkMail($scope.email, $scope.userName, $scope.password)
        };
    });
}

export default registerController;