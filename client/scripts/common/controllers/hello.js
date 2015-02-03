'use strict';
var controllername = 'hello';

module.exports = function(app) {
    /*jshint validthis: true */

    var deps = [];

    function controller() {
        var vm = this;
        vm.message = 'Hello World';
        var activate = function() {
        
            var Transitionable = famous.transitions.Transitionable;
            var Easing = famous.transitions.Easing;

            vm.myGridLayoutOptions = {
              dimensions: [2, 3]
            };

            vm.list = [
              {content:"hello", bgColor: "#b58900", rotate: new Transitionable(0)},
              {content:"world", bgColor: "#cb4b16", rotate: new Transitionable(0)},
              {content: "famous", bgColor: "#dc322f", rotate: new Transitionable(0)},
              {content: "angular", bgColor: "#d33682", rotate: new Transitionable(0)},
              {content: "is", bgColor: "#6c71c4", rotate: new Transitionable(0)},
              {content: "cool!", bgColor: "#268bd2", rotate: new Transitionable(0)}
            ];

            vm.animate = function() {
              for (var i = 0; i < vm.list.length; i++) {
                vm.list[i].rotate.set(Math.PI * 4, {curve: Easing.inOutElastic, duration: 3000 * i}) 
              };
            };

            vm.animate();
        };
        activate();
    }

    controller.$inject = deps;
    app.controller(app.name + '.' + controllername, controller);
};