'use strict';
var controllername = 'hello';

function switchColors(fromColor, toColor){
    var tempColor = fromColor;
    fromColor = toColor;
    toColor = tempColor;   
}

module.exports = function(app) {
    /*jshint validthis: true */

    var deps = [];

    
    function controller() {
        var vm = this;
        vm.message = 'Hello World';
        var portrait = true;
            
        vm.click = function(item) {
            if(item['flag']) {
                var tempColor = item['firstColor'];
                var tempIcon =  item['firstIcon'];
                item['firstColor'] = item['secondColor'];
                item['firstIcon'] = item['secondIcon'];
                item['secondColor'] = tempColor;
                item['secondIcon'] = tempIcon;
                item['flag'] = false;
            } else {
                var tempColor = item['secondColor'];
                var tempIcon =  item['secondIcon'];
                item['secondColor'] = item['firstColor'];
                item['secondIcon'] = item['firstIcon'];
                item['firstColor'] = tempColor;
                item['firstIcon'] = tempIcon;
                item['flag'] = true;
            }
        };
        
        vm.myGridLayoutOptions = {
          dimensions: [2,3]
        };
        
        vm.animate = function() {
            var Easing = famous.transitions.Easing;
            for (var i = 0; i < vm.list.length; i++) {
                vm.list[i].rotate.set(Math.PI * 4, {curve: Easing.inOutElastic, duration: 3000 * i}); 
            };
        };  
        vm.reset = function() {
            for (var i = 0; i < vm.list.length; i++) {
                vm.list[i].rotate.set(0); 
            };
        };   
        
        famous.core.Engine.on('resize', function(){
            vm.reset();
            var size = context.getSize();
            if (size[0] > size[1]) {
                // landscape
                vm.myGridLayoutOptions.dimensions[0]=3;
                vm.myGridLayoutOptions.dimensions[1]=2;
            } else {
                // portrait
                vm.myGridLayoutOptions.dimensions[0]=2;
                vm.myGridLayoutOptions.dimensions[1]=3;
            } 
            vm.animate();
        });
        
        var activate = function() {
            var Transitionable = famous.transitions.Transitionable;
            vm.list = [
              {firstIcon:"ion-heart", secondIcon: "ion-heart-broken", firstColor: "#f44336", secondColor: "#e91e63", rotate: new Transitionable(0), flag:true},
              {firstIcon:"ion-wrench", secondIcon: "ion-hammer", firstColor: "#9c27b0", secondColor: "#673ab7",  rotate: new Transitionable(0), flag:true},
              {firstIcon:"ion-cloud", secondIcon: "ion-upload", firstColor: "#3f51b5", secondColor: "#2196f3",  rotate: new Transitionable(0), flag:true},
              {firstIcon:"ion-person", secondIcon: "ion-person-stalker", firstColor: "#03a9f4", secondColor: "#ff9800",  rotate: new Transitionable(0), flag:true},
              {firstIcon:"ion-woman", secondIcon: "ion-man", firstColor: "#009688", secondColor: "#ff5722",  rotate: new Transitionable(0), flag:true},
              {firstIcon:"ion-coffee", secondIcon: "ion-beer", firstColor: "#8bc34a", secondColor: "#cddc39",  rotate: new Transitionable(0), flag:true}
            ];
            vm.animate();
        };
        
        
        
        activate();
    }
    
    

    controller.$inject = deps;
    app.controller(app.name + '.' + controllername, controller);
};