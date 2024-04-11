const axios_ins = axios.create({
    baseURL: "https://easy-quiz-f2641-default-rtdb.firebaseio.com"
});

async function checkLogin(email, password) {
    const getUser = await axios_ins.get('/users.json');
    const userData = getUser.data; 
    let isCheckMail = false;
    let user = {};
    for(const key in userData) {
        if (Object.hasOwnProperty.call(userData, key)) {
            const users = userData[key];

            if (users.email === email) {
                isCheckMail = true;
                user = users;
            }
        }
    }

    if (!isCheckMail) {
        Swal.fire({
            title: "Cảnh báo!",
            text: "Tài khoản này không tồn tại",
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

        return false;
    }else {
        if (user.password == password) {
            Swal.fire({
                title: 'Thành công!',
                text: 'Đăng nhập thành công!',
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

            localStorage.setItem('fullname', user.fullname);
            localStorage.setItem('userId', user.id);

            return true;
        }else {
            Swal.fire({
                title: "Cảnh báo!",
                text: "Mật khẩu không chính xác",
                icon: "warning",
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
            return false;
        }
    }
}

function createToken(username, password) {
    const hash = md5(username + password);
    return hash;
  }

const loginController = (app) => {
    app.controller('LoginController', ($scope, $window) => {
        $scope.email = "";
        $scope.password = ""; 

        $scope.submitForm = async () => {
            if (await checkLogin($scope.email, $scope.password)) {
                $window.location.href = '#!';
            }
        }
    });
}

export default loginController;