const route = (app) => {
    app.config( $routeProvider => {
        $routeProvider
            .when('/', {
                templateUrl: 'src/views/clients/home.html',
            })
            .when('/khoa-hoc/:categoryId/page=:page', {
                templateUrl: 'src/views/clients/categories.html'
            })
            .when('/chi-tiet-khoa-hoc/:id', {
                templateUrl: 'src/views/clients/detail.html'
            })
            .when('/he-thong-quiz/:id', {         
                templateUrl: 'src/views/clients/systemQuiz.html'
            })
            .when('/ket-qua/:id', {
                templateUrl: 'src/views/clients/result.html'
            })
            .when('/gioi-thieu', {
                templateUrl: 'src/views/clients/about.html'
            })
            .when('/lien-he', {
                templateUrl: 'src/views/clients/contact.html'
            })
            .when('/gop-y', {
                templateUrl: 'src/views/clients/feedback.html'
            })
            .when('/hoi-dap', {
                templateUrl: 'src/views/clients/ask.html'
            })
            .when('/dang-nhap', {
                templateUrl: '/src/views/clients/login.html'
            })
            .when('/dang-ky', {
                templateUrl: 'src/views/clients/register.html'
            })
            .when('/doi-mat-khau/:id', {
                templateUrl: 'src/views/clients/forgotPsw.html'
            })
            .when('/thong-tin-ca-nhan/:id', {
                templateUrl: 'src/views/clients/profile.html'
            })
            .when('/bang-diem/:id', {
                templateUrl: 'src/views/clients/transcript.html'
            })
            .when('/tim-kiem/:data', {
                templateUrl: 'src/views/clients/search.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    }); 
}

export default route;