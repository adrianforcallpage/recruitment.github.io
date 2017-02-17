angular
    .module('countryApp.controllers', [])
    .controller('listController', listController)

function listController(listFactory, $scope) {

  	$scope.checkbox = [
  		{selected: false},
  		{selected: false},
  		{selected: false},
  		{selected: false},
  		{selected: false},
  		{selected: false}
  	];

    $scope.continents = [
	    {name: 'AFRICA', countrys: []}, 
	    {name: 'AMERICAS', countrys: []},
	    {name: 'ASIA', countrys: []},
	    {name: 'EUROPE', countrys: []},
	    {name: 'OCEANIA', countrys: []},
	    {name: 'POLAR', countrys: []}
    ];

    listFactory.query(function (data) {
        for(var i = 0; i < data.length; ++i) {
            var obj = data[i];
            var continentObj = {name: obj.name, region: obj.region, checked: false};
 		for(var j = 0; j < $scope.continents.length; j++) {
			if($scope.continents[j].name === continentObj.region) {
				$scope.continents[j].countrys.push(continentObj)
			}
		}
            }
    });

	$scope.checkAll = function() {
		for(var i = 0; i < $scope.checkbox.length; i++) {
			if($scope.checkbox[i].selected) {
				$scope.continents[i].countrys.forEach(function (obj) {
					obj.checked = true;
				})
			} 

			else if(!$scope.checkbox[i].selected) {
				$scope.continents[i].countrys.forEach(function (obj) {
					obj.checked = false;
				})
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



