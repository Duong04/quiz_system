const transcriptController = (app) => {
    app.controller('TranscriptController', async ($scope, $routeParams, $http) => {
        const userId = $routeParams.id;
        $scope.quizScores = [];
        const getQuiz = (userId) => {
            $http.get('https://easy-quiz-f2641-default-rtdb.firebaseio.com/quiz_scores.json')
            .then(response => {
                const responseData = response.data;
                for(let key in responseData) {
                    if (responseData[key].userId == userId) {
                        $scope.quizScores.push(responseData[key]);
                    }
                }
            });
        }

        getQuiz(userId);
    })
};

export default transcriptController;