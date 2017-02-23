angular
    .module('countryApp.controllers', [])
    .controller('listController', listController)

    function listController (listFactory) {
        
        var vm = this;

        vm.continents = [
            {name: 'AFRICA', countrys: [], selected: false}, 
            {name: 'AMERICAS', countrys: [], selected: false},
            {name: 'ASIA', countrys: [], selected: false},
            {name: 'EUROPE', countrys: [], selected: false},
            {name: 'OCEANIA', countrys: [], selected: false},
            {name: 'POLAR', countrys: [], selected: false}
        ];

        listFactory.query(data => {
            for(let i = 0; i < data.length; i++) {
                const obj = data[i],
                    newObj = {name: obj.name, region: obj.region, checked: false}    
                for(let j = 0; j < vm.continents.length; j++) {
                    if(vm.continents[j].name.toLowerCase() === newObj.region.toLowerCase()) {
                        vm.continents[j].countrys.push(newObj)
                    }
                }
            } 
        })

        vm.checkAll = continent => {
            for(let i = 0; i < vm.continents.length; i++) {
                if(vm.continents[i].name == continent.name && continent.selected) {
                    vm.continents[i].countrys.forEach(elem => {
                        elem.checked = true;
                    })
                } else {
                    vm.continents[i].countrys.forEach(elem => {
                        elem.checked = false;
                    })
                }
            }
        }

        vm.checkContinentIfAllChecked = country => {

            let continent,
                index,
                bool;

            for(let i = 0; i < vm.continents.length; i++) {
                if(vm.continents[i].name.toLowerCase() == country.region.toLowerCase()) {
                    index = i
                    continent = vm.continents[index]
                }
            }

            bool = continent.countrys.every(element => {
                return element.checked === true ? true : false;
            })
            
            bool ?  continent.selected = true :  continent.selected = false;
        }   
    }
