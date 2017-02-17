angular
    .module('countryApp.controllers', [])
    .controller('listController', listController)

function listController(listFactory, $scope) {

	$scope.continents = [
	    {name: 'AFRICA', countrys: [], selected: false}, 
	    {name: 'AMERICAS', countrys: [], selected: false},
	    {name: 'ASIA', countrys: [], selected: false},
	    {name: 'EUROPE', countrys: [], selected: false},
	    {name: 'OCEANIA', countrys: [], selected: false},
	    {name: 'POLAR', countrys: [], selected: false}
    ];

    listFactory.query(function (data) {
        for(var i = 0; i < data.length; i++) {
            var obj = data[i],
                newObj = {name: obj.name, region: obj.region, checked: false}    
            for(var j = 0; j < $scope.continents.length; j++) {
                if($scope.continents[j].name.toLowerCase() === newObj.region.toLowerCase()) {
                    $scope.continents[j].countrys.push(newObj)
                }
            }
        } 
    })

    $scope.checkAll = function (continent) {
        if(continent.selected) {
            for(var i = 0; i < $scope.continents.length; i++) {
                if($scope.continents[i].name.toLowerCase() === continent.name.toLowerCase()) {
                    $scope.continents[i].countrys.forEach(function (elem) {
                        elem.checked = true;
                    })
                }
            }
        } else if (!continent.selected) {
            for(var i = 0; i < $scope.continents.length; i++) {
                if($scope.continents[i].name.toLowerCase() === continent.name.toLowerCase()) {
                    $scope.continents[i].countrys.forEach(function (elem) {
                        elem.checked = false;
                    })
                }
            }           
        }
    }
	$scope.changeIfAllChecked = function (country) {

		var continent,
			index,
			bool;

		for(var i = 0; i < $scope.continents.length; i++) {
			if($scope.continents[i].name.toLowerCase() == country.region.toLowerCase()) {
				index = i
				continent = $scope.continents[index]
			}
		}

		bool = continent.countrys.every(function (element) {
			if(element.checked === true) {
				return true;
			} else {
				return false;
			}
		})

		if(bool) {
			$scope.checkbox[index].selected = true;
		} else if(!bool){
			$scope.checkbox[index].selected = false;
		}
	}	

}



