const axios_ins = axios.create({
    baseURL: "https://easy-quiz-f2641-default-rtdb.firebaseio.com"
});

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

async function getUser(id) {
    const response = await axios_ins.get(`users/${id}.json`);

    return response.data;
}

async function updatePassword(id, password, newPassword) {
    const user = await getUser(id);
    if (user.password == password) {
        axios_ins.patch(`users/${id}.json`, { password: newPassword});
        messageSuccess('Cập nhật mật khẩu thành công!');
    }else {
        messageWarning('Mật khẩu bạn nhập không đúng!');
    }
}

const forrgotPswController = (app) => {
    app.controller('ForgotPswController', ($scope, $routeParams) => {
        const userId = $routeParams.id;
        $scope.password = '';
        $scope.newPassword = '';

        $scope.submitForm = async () => {
            await updatePassword(userId, $scope.password, $scope.newPassword);
            $scope.password = '';
            $scope.newPassword = '';
            $scope.$apply();  
        }
    })
}

export default forrgotPswController;