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
    const response = await axios_ins.get(`/users/${id}.json`);

    return response.data;
}

async function getAllUsers() {
    const response = await axios_ins.get(`/users.json`);

    return response.data;
}

async function updateUser(id, fullname, email, password, newPassword) {
    const user = await getUser(id);
    let isCheckMail = true;

    if (user.password !== password) {
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
                const updateUser = await axios_ins.patch(`/users/${id}.json`, {id, email, fullname});
                if (updateUser) {
                    messageSuccess('Thông tin của bạn đã được cập nhật!');
                    localStorage.setItem('fullname', fullname);
                }
            }else {
                if (newPassword.length >= 6) {
                    const updateUser = await axios_ins.patch(`/users/${id}.json`, {id, email, fullname, password: newPassword});
                    if (updateUser) {
                        messageSuccess('Thông tin của bạn đã được cập nhật!');
                        localStorage.setItem('fullname', fullname);
                    }
                }
            }
        }else {
            messageWarning('Email này đã được đăng ký!')
        }
    }
}


const profileController = (app) => {
    app.controller('ProfileController', async ($scope, $routeParams) => {
        const userId = $routeParams.id;
        const user = await getUser(userId);
        $scope.firstThreeFieldsValid = false;
        $scope.fullname = '';
        $scope.email = '';
        $scope.password = '';
        $scope.newPassword = '';

        if (user) {
            $scope.fullname = user.fullname;
            $scope.email = user.email;
            $scope.$apply();      
        }

        
        $scope.submitForm = () => {
            if ($scope.myForm.newPassword.$invalid) {
                messageWarning('Mật khẩu mới của bạn không được nhỏ hơn 6!');
            }
            updateUser(userId, $scope.fullname, $scope.email, $scope.password, $scope.newPassword);
        }
        
    }) 
}

export default profileController;