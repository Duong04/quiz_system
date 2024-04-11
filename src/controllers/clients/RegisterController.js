const axios_ins = axios.create({
    baseURL: "https://easy-quiz-f2641-default-rtdb.firebaseio.com"
});

async function checkEmail(email, fullname, password) {
    const getUser = await axios_ins.get('/users.json');
    const userData = getUser.data;
    let isCheckMail = true;
    for(const key in userData) {
        if (Object.hasOwnProperty.call(userData, key)) {
            const users = userData[key];

            if (users.email === email) {
                isCheckMail = false;
            }
        }
    }

    if (!isCheckMail) {
        Swal.fire({
            title: "Cảnh báo!",
            text: "Tài khoản này đã tồn tại",
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
    }else {
        const user = {email, password, fullname};
        const response = await axios_ins.post('/users.json', user);

        if (response.status === 200) {
            const userId = response.data.name;

            await axios_ins.patch(`/users/${userId}.json`, {id: userId});
            Swal.fire({
                title: 'Thành công!',
                text: 'Đăng ký tài khoản thành công!',
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
    }

    return isCheckMail;
}

const registerController = (app) => {
    app.controller('RegisterController', ($scope, $window) => {
        $scope.userName = '';
        $scope.email = '';
        $scope.password = '';
        $scope.confirmPsw = '';

        $scope.submitForm = async () => {
            if( await checkEmail($scope.email, $scope.userName, $scope.password)) {
                $window.location.href = '#!dang-nhap';
            }
        };
    });
}

export default registerController;