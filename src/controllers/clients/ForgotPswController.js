const forrgotPswController = (app) => {
    app.controller('ForgotPswController', ($scope, $routeParams, $http) => {
        const userId = $routeParams.id;
        $scope.password = '';
        $scope.newPassword = '';

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
                title: "Thành công!",
                text: text,
                icon: "success",
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

        const updatePassword = (userId, password, newPassword) => {
            $http.get(`https://easy-quiz-f2641-default-rtdb.firebaseio.com/users/${userId}.json`)
            .then(response => {
                const user = response.data;
                if (user.password == password) {
                    $http.patch(`https://easy-quiz-f2641-default-rtdb.firebaseio.com/users/${userId}.json`, {password: newPassword})
                    .then(response => {
                        messageSuccess('Cập nhật mật khẩu thành công!');
                    });
                }else {
                    messageWarning('Mật khẩu bạn nhập không đúng!');
                }
            });
        }

        $scope.submitForm = async () => {
            updatePassword(userId, $scope.password, $scope.newPassword);
            $scope.password = '';
            $scope.newPassword = '';
        }
    })
}

export default forrgotPswController;