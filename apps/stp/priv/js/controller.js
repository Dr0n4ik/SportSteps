angular.module('Sport_Steps', ['ngResource']);

function LogCtrl($scope, $http) {
    var kinds = ["Workout", "Бодибилдинг", "Легкая атлетика",
                        "Тяжелая атлетика", "Паркур", "Велоспорт",
                        "Плавание", "Другой"];
    $scope.kindsList = kinds;
    
    $scope.kindOfSport = 1;
    
    $scope.send = function() {
        $http.get('http://127.0.0.1:3988/vote',
            {params: {vote: $scope.kindOfSport}}).success(
                function(data, status) {
                    $scope.answ = 'INFO: ' + selectKindOfSport(data);    
                });
    }

    function selectKindOfSport(data) {
            return kinds[data];
    }
}
