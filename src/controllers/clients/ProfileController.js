const axios_ins = axios.create({
    baseURL: "https://easy-quiz-f2641-default-rtdb.firebaseio.com"
});

async function getAllUsers() {
    const response = await axios_ins.get(`/users.json`);

    return response.data;
}

const profileController = (app) => {
    app.controller('ProfileController', ($scope, $routeParams, $http) => {
        const userId = $routeParams.id;
        let passwordOld;
        let user = {};
        $scope.firstThreeFieldsValid = false;
        $scope.fullname = '';
        $scope.email = '';
        $scope.passwordOld = '';
        $scope.newPassword = '';

        const getUser = (userId) => {
            $http.get(`https://easy-quiz-f2641-default-rtdb.firebaseio.com/users/${userId}.json`)
            .then(response => {
                user = response.data;
                if (user) {
                    $scope.fullname = user.fullname;
                    $scope.email = user.email;
                    passwordOld = user.password;
                }
            });
        };

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

        getUser(userId);

        const updateUser = async (id, fullname, email, password, newPassword) => {
            console.log($scope.email);
            let isCheckMail = true;

            if (passwordOld != password) {
                messageWarning('Mật khẩu của bạn không đúng!');
            }else {
                const users = await getAllUsers();
                for (let key in users) {
                    if (users[key].email == email && users[key].id != id) {
                        isCheckMail = false;
                    }
                }

                if (isCheckMail) {
                    if (newPassword == '') {
                        $http.patch(`https://easy-quiz-f2641-default-rtdb.firebaseio.com/users/${id}.json`, {fullname, email})
                        .then((response) => {
                            if (response.status == 200) {
                                messageSuccess('Thông tin của bạn đã được cập nhật!');
                                localStorage.setItem('fullname', fullname);
                            }
                        });
                    }else {
                        if (newPassword.length >= 6) {
                            $http.patch(`https://easy-quiz-f2641-default-rtdb.firebaseio.com/users/${id}.json`, {fullname, email , password: newPassword})
                            .then((response) => {
                                if (response.status == 200) {
                                    messageSuccess('Thông tin của bạn đã được cập nhật!');
                                    localStorage.setItem('fullname', fullname);
                                }
                            });
                        }
                    }
                }else {
                    messageWarning('Email này đã được đăng ký!')
                }
            }
        }
        
        $scope.submitForm = () => {
            if ($scope.newPassword != '' && $scope.myForm.newPassword.$invalid) {
                messageWarning('Mật khẩu mới của bạn không được nhỏ hơn 6!');
            }else {
                updateUser(userId, $scope.fullname, $scope.email, $scope.password, $scope.newPassword);
            }
        }
    }) 
}

export default profileController;