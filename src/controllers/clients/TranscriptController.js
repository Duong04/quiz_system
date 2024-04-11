const axios_ins = axios.create({
    baseURL: "https://easy-quiz-f2641-default-rtdb.firebaseio.com"
});

async function getQuiz(userId) {
    const response = await axios_ins.get(`/quiz_scores.json`);

    const getData = response.data;
    let getQuizId = [];
    for (let item in getData) {
        if (getData[item].userId === userId) {
            getQuizId.push(getData[item]);
        }
    }

    return getQuizId;
    
}

const transcriptController = (app) => {
    app.controller('TranscriptController', async ($scope, $routeParams) => {
        const userId = $routeParams.id;
        $scope.quizScores = await getQuiz(userId);
        console.log($scope.quizScores);
        $scope.$apply();
    })
};

export default transcriptController;